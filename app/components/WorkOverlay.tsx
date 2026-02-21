"use client";

import { useState, useEffect, useCallback } from "react";
import { PROJECTS, FILTERS, Filter } from "@/app/lib/projects";
import OverlayTopBar from "./overlay/OverlayTopBar";
import GalleryImage from "./overlay/GalleryImage";
import OverlayStates from "./overlay/OverlayStates";
import DotIndicators from "./overlay/DotIndicators";

interface WorkOverlayProps {
  open: boolean;
  initialFilter?: string;
  onClose: () => void;
}

export default function WorkOverlay({ open, initialFilter, onClose }: WorkOverlayProps) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [entered, setEntered] = useState(false);
  const [swipeHint, setSwipeHint] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [signedUrls, setSignedUrls] = useState<Record<number, string>>({});
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const resolveFilter = (f?: string): Filter =>
    FILTERS.includes(f as Filter) ? (f as Filter) : "All";

  const [activeFilter, setActiveFilter] = useState<Filter>(resolveFilter(initialFilter));

  // Sync filter + reset state whenever overlay opens
  useEffect(() => {
    if (open) {
      setActiveFilter(resolveFilter(initialFilter));
      setCurrent(0);
      setEntered(false);
      setSwipeHint(true);
      const t = setTimeout(() => setEntered(true), 30);
      return () => clearTimeout(t);
    } else {
      setEntered(false);
    }
  }, [open, initialFilter]);

  // Dismiss swipe hint after 2.5s
  useEffect(() => {
    if (!swipeHint) return;
    const t = setTimeout(() => setSwipeHint(false), 2500);
    return () => clearTimeout(t);
  }, [swipeHint]);

  // Mobile detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Reset to first slide on filter change
  useEffect(() => { setCurrent(0); }, [activeFilter]);

  const filteredProjects =
    activeFilter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === activeFilter);

  const navigableProjects = filteredProjects.filter((p) => !!p.imageKey);

  // Fetch signed URLs for all visible projects
  useEffect(() => {
    if (!open) return;
    filteredProjects.forEach((p) => {
      if (!p.imageKey || signedUrls[p.id] || imgErrors[p.id]) return;
      fetch(`/api/media?key=${encodeURIComponent(p.imageKey)}`)
        .then((r) => r.json())
        .then((data: { url?: string }) => {
          if (data.url) setSignedUrls((prev) => ({ ...prev, [p.id]: data.url! }));
        })
        .catch(() => setImgErrors((prev) => ({ ...prev, [p.id]: true })));
    });
  }, [open, activeFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  const go = useCallback(
    (dir: "next" | "prev") => {
      if (animating || navigableProjects.length <= 1) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent((c) =>
          dir === "next"
            ? (c + 1) % navigableProjects.length
            : (c - 1 + navigableProjects.length) % navigableProjects.length
        );
        setAnimating(false);
      }, 380);
    },
    [animating, navigableProjects.length]
  );

  // Keyboard navigation + Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") go("next");
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") go("prev");
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, go, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const project = navigableProjects[Math.min(current, navigableProjects.length - 1)] ?? PROJECTS[0];
  const imageUrl = !imgErrors[project.id] ? (signedUrls[project.id] ?? null) : null;
  const imageLoading = !signedUrls[project.id] && !imgErrors[project.id];
  const allFailed = navigableProjects.length > 0 && navigableProjects.every((p) => imgErrors[p.id]);
  const topBarHeight = isMobile ? "5.5rem" : "7.5rem";

  const handleImageError = (id: number) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
    setSignedUrls((prev) => { const n = { ...prev }; delete n[id]; return n; });
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0A0A0A",
        zIndex: 200,
        overflow: "hidden",
        opacity: entered ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      {/* Per-project ambient gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: project.gradient,
          transition: "background 0.6s ease",
          zIndex: 0,
        }}
      />

      {/* Noise grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.032,
          pointerEvents: "none",
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.65) 100%)",
          pointerEvents: "none",
        }}
      />

      <GalleryImage
        project={project}
        imageUrl={imageUrl}
        onGo={go}
        onError={handleImageError}
      />

      <OverlayTopBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        isMobile={isMobile}
      />

      {/* Close button — floating over the photo */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          top: `calc(${topBarHeight} + 1rem)`,
          right: isMobile ? "1.25rem" : "1.75rem",
          zIndex: 20,
          cursor: "pointer",
          opacity: 0.5,
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.5")}
      >
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#F0EBE0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <OverlayStates
        isEmpty={filteredProjects.length === 0}
        isLoading={navigableProjects.length > 0 && imageLoading && !allFailed}
        allFailed={allFailed}
        onReset={() => setActiveFilter("All")}
      />

      <DotIndicators
        count={navigableProjects.length}
        current={current}
        showSwipeHint={swipeHint}
      />
    </div>
  );
}
