"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

// Images are served via the /api/media signed-URL route (private bucket).

const PROJECTS = [
  {
    id: 1,
    title: "Cascade Ridge Outfitters",
    category: "Commercial",
    year: "2025",
    description:
      "A full brand campaign spanning three seasons — portraits, lifestyle, and product — shot across the Cascades and Puget Sound. Delivered 400+ selects across stills and motion.",
    services: ["Brand Photography", "Video Production", "Color Grade"],
    gradient: "linear-gradient(135deg, #1a1208 0%, #2e1f0f 35%, #3a2510 60%, #0f0e0c 100%)",
    accent: "#C9A96E",
    index: "01",
    imageKey: "",
  },
  {
    id: 2,
    title: "The Fishermen of Grays Harbor",
    category: "Documentary",
    year: "2025",
    description:
      "A short-form documentary following three generations of commercial fishermen on the Washington coast. Screening at the Pacific Northwest Film Collective in April 2026.",
    services: ["Documentary", "Long-Form Edit", "Sound Design"],
    gradient: "linear-gradient(135deg, #0a1520 0%, #0d1f30 40%, #152a3a 70%, #080c10 100%)",
    accent: "#6E9EC9",
    index: "02",
    imageKey: "",
  },
  {
    id: 3,
    title: "Emerald City Summit 2025",
    category: "Corporate",
    year: "2025",
    description:
      "Three-day tech conference coverage across keynotes, panels, and after-parties. A 4-minute highlight reel plus 12 speaker portrait sessions.",
    services: ["Event Coverage", "Portrait Sessions", "Same-Day Edit"],
    gradient: "linear-gradient(135deg, #150a0a 0%, #221010 40%, #2a1515 70%, #0c0808 100%)",
    accent: "#C96E6E",
    index: "03",
    imageKey: "",
  },
  {
    id: 4,
    title: "Vela Studio Rebrand",
    category: "Architectural",
    year: "2024",
    description:
      "Full visual identity photography for a Seattle-based interior design studio. 80 images across their residential and commercial portfolio, shot over two weeks.",
    services: ["Architectural", "Interior", "Retouching"],
    gradient: "linear-gradient(135deg, #0f1510 0%, #182210 40%, #1a2a12 70%, #0a0f08 100%)",
    accent: "#8EC96E",
    index: "04",
    imageKey: "",
  },
  {
    id: 5,
    title: "North Sound Spirits",
    category: "Editorial",
    year: "2024",
    description:
      "Product and editorial campaign for an independent craft distillery. Shot across their production facility and the San Juan Islands to capture the provenance of the brand.",
    services: ["Product Photography", "Editorial", "Brand Film"],
    gradient: "linear-gradient(135deg, #15100a 0%, #221a0f 40%, #2a2010 70%, #0c0a08 100%)",
    accent: "#C9B46E",
    index: "05",
    imageKey: "",
  },
  {
    id: 6,
    title: "Ironclad Athletics",
    category: "Sports",
    year: "2024",
    description:
      "High-energy sports campaign for an independent fitness brand — athlete portraits, facility walkthroughs, and a 90-second brand manifesto film.",
    services: ["Sports Photography", "Action", "Color Grade"],
    gradient: "linear-gradient(135deg, #0f0f15 0%, #14141f 40%, #1a1a2a 70%, #080810 100%)",
    accent: "#9E6EC9",
    index: "06",
    imageKey: "portfolio/Sports/Web/02:19:26/DSC01753.webp",
  },
  {
    id: 7,
    title: "Ironclad Athletics",
    category: "Sports",
    year: "2024",
    description:
      "High-energy sports campaign for an independent fitness brand — athlete portraits, facility walkthroughs, and a 90-second brand manifesto film.",
    services: ["Sports Photography", "Action", "Color Grade"],
    gradient: "linear-gradient(135deg, #0f0f15 0%, #14141f 40%, #1a1a2a 70%, #080810 100%)",
    accent: "#9E6EC9",
    index: "07",
    imageKey: "portfolio/Sports/Web/02:19:26/DSC01772.webp",
  },
  {
    id: 8,
    title: "Ironclad Athletics",
    category: "Sports",
    year: "2024",
    description:
      "High-energy sports campaign for an independent fitness brand — athlete portraits, facility walkthroughs, and a 90-second brand manifesto film.",
    services: ["Sports Photography", "Action", "Color Grade"],
    gradient: "linear-gradient(135deg, #0f0f15 0%, #14141f 40%, #1a1a2a 70%, #080810 100%)",
    accent: "#9E6EC9",
    index: "08",
    imageKey: "portfolio/Sports/Web/02:19:26/DSC01785.webp",
  },
  {
    id: 9,
    title: "Ironclad Athletics",
    category: "Sports",
    year: "2024",
    description:
      "High-energy sports campaign for an independent fitness brand — athlete portraits, facility walkthroughs, and a 90-second brand manifesto film.",
    services: ["Sports Photography", "Action", "Color Grade"],
    gradient: "linear-gradient(135deg, #0f0f15 0%, #14141f 40%, #1a1a2a 70%, #080810 100%)",
    accent: "#9E6EC9",
    index: "09",
    imageKey: "portfolio/Sports/Web/02:20:26/DSC01808.webp",
  },
  {
    id: 10,
    title: "Ironclad Athletics",
    category: "Sports",
    year: "2024",
    description:
      "High-energy sports campaign for an independent fitness brand — athlete portraits, facility walkthroughs, and a 90-second brand manifesto film.",
    services: ["Sports Photography", "Action", "Color Grade"],
    gradient: "linear-gradient(135deg, #0f0f15 0%, #14141f 40%, #1a1a2a 70%, #080810 100%)",
    accent: "#9E6EC9",
    index: "10",
    imageKey: "portfolio/Sports/Web/02:20:26/DSC01815.webp",
  },
  {
    id: 11,
    title: "Ironclad Athletics",
    category: "Sports",
    year: "2024",
    description:
      "High-energy sports campaign for an independent fitness brand — athlete portraits, facility walkthroughs, and a 90-second brand manifesto film.",
    services: ["Sports Photography", "Action", "Color Grade"],
    gradient: "linear-gradient(135deg, #0f0f15 0%, #14141f 40%, #1a1a2a 70%, #080810 100%)",
    accent: "#9E6EC9",
    index: "11",
    imageKey: "portfolio/Sports/Web/02:20:26/DSC01827.webp",
  },
  {
    id: 12,
    title: "Ironclad Athletics",
    category: "Sports",
    year: "2024",
    description:
      "High-energy sports campaign for an independent fitness brand — athlete portraits, facility walkthroughs, and a 90-second brand manifesto film.",
    services: ["Sports Photography", "Action", "Color Grade"],
    gradient: "linear-gradient(135deg, #0f0f15 0%, #14141f 40%, #1a1a2a 70%, #080810 100%)",
    accent: "#9E6EC9",
    index: "12",
    imageKey: "portfolio/Sports/Web/02:20:26/DSC01828.webp",
  },
  {
    id: 13,
    title: "Ironclad Athletics",
    category: "Sports",
    year: "2024",
    description:
      "High-energy sports campaign for an independent fitness brand — athlete portraits, facility walkthroughs, and a 90-second brand manifesto film.",
    services: ["Sports Photography", "Action", "Color Grade"],
    gradient: "linear-gradient(135deg, #0f0f15 0%, #14141f 40%, #1a1a2a 70%, #080810 100%)",
    accent: "#9E6EC9",
    index: "13",
    imageKey: "portfolio/Sports/Web/02:20:26/DSC01832.webp",
  },
];

const FILTERS = [
  "All",
  "Commercial",
  "Documentary",
  "Corporate",
  "Sports",
  "Editorial",
  "Architectural",
  "Portrait",
] as const;

type Filter = (typeof FILTERS)[number];

function WorkPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [entered, setEntered] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  // Signed URLs keyed by project id — fetched on demand from /api/media
  const [signedUrls, setSignedUrls] = useState<Record<number, string>>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);
  const [activeFilter, setActiveFilter] = useState<Filter>(() => {
    const fromQuery = searchParams.get("filter");
    return FILTERS.includes(fromQuery as Filter) ? (fromQuery as Filter) : "All";
  });

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  // Only navigate/count projects that have a real image (non-empty imageKey)
  const navigableProjects = filteredProjects.filter((p) => !!p.imageKey);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Reset to first slide whenever the active filter changes
  useEffect(() => {
    setCurrent(0);
  }, [activeFilter]);

  // Fetch signed URLs for all projects in the active filter
  useEffect(() => {
    filteredProjects.forEach((p) => {
      if (!p.imageKey || signedUrls[p.id] || imgErrors[p.id]) return;
      fetch(`/api/media?key=${encodeURIComponent(p.imageKey)}`)
        .then((r) => r.json())
        .then((data: { url?: string }) => {
          if (data.url) {
            setSignedUrls((prev) => ({ ...prev, [p.id]: data.url! }));
          }
        })
        .catch(() => {
          setImgErrors((prev) => ({ ...prev, [p.id]: true }));
        });
    });
  }, [activeFilter, filteredProjects, signedUrls, imgErrors]);

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

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") go("next");
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") go("prev");
      if (e.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go, router]);

  const project =
    navigableProjects[Math.min(current, navigableProjects.length - 1)] ??
    PROJECTS[0];
  const imageUrl = !imgErrors[project.id] ? (signedUrls[project.id] ?? null) : null;
  const imageLoading = !signedUrls[project.id] && !imgErrors[project.id];
  const allFailed = navigableProjects.length > 0 && navigableProjects.every((p) => imgErrors[p.id]);
  const displayIndex = navigableProjects.length > 0 ? current + 1 : 0;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0A0A0A",
        zIndex: 100,
        overflow: "hidden",
        opacity: entered ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    >
      {/* Full-bleed background gradient tied to current project */}
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
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.65) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── GCS image panel (upper ~62% of viewport) ── */}
      <div
        style={{
          position: "absolute",
          top: isMobile ? "6rem" : "8rem",
          bottom: isMobile ? "4.5rem" : "5rem",
          left: 0,
          right: 0,
          height: "auto",
          background: "#050505",
          zIndex: 3,
          overflow: "hidden",
          transition: "opacity 0.4s ease",
          opacity: imageUrl ? 1 : 0,
          pointerEvents: "none",
        }}
      >
        {imageUrl && (
          <Image
            key={project.id}
            src={imageUrl}
            alt={project.title}
            fill
            priority
            style={{ objectFit: "contain", objectPosition: "center" }}
            onError={() => {
              setImgErrors((prev) => ({ ...prev, [project.id]: true }));
              // Clear the stale signed URL so it won't be retried
              setSignedUrls((prev) => { const n = { ...prev }; delete n[project.id]; return n; });
            }}
          />
        )}
      </div>

      {/* Top bar — two-row: nav + filter pills */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(8,8,8,0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Row 1: Logo | count | X */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: isMobile ? "0.875rem 1.25rem" : "1.25rem 2rem",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => router.push("/")}
            style={{
              fontFamily: "var(--font-playfair)",
              color: "#F0EBE0",
              fontSize: "1rem",
              fontWeight: 600,
              background: "none",
              border: "none",
              cursor: "pointer",
              letterSpacing: "-0.01em",
            }}
          >
            Brighthorn<span style={{ color: "#C9A96E" }}>.</span>
          </button>

          {/* Center label */}
          <span
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: "0.6875rem",
              letterSpacing: "0.2em",
              fontFamily: "var(--font-geist-mono)",
              textTransform: "uppercase",
            }}
          >
            {activeFilter === "All" ? "Selected Work" : activeFilter}
            {" "}&mdash;{" "}
            {displayIndex} / {navigableProjects.length}
          </span>

          {/* Close */}
          <button
            onClick={() => router.push("/")}
            aria-label="Close"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
              borderRadius: "2px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#F0EBE0",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Row 2: Filter pills */}
        <div
          className="filter-pill-row"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            padding: isMobile ? "0 1.25rem 0.75rem" : "0 2rem 1rem",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          } as React.CSSProperties}
        >
          {FILTERS.map((f) => {
            const isActive = f === activeFilter;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  flexShrink: 0,
                  height: "1.75rem",
                  padding: "0 0.875rem",
                  border: isActive
                    ? "1px solid #C9A96E"
                    : "1px solid rgba(255,255,255,0.1)",
                  background: isActive ? "#C9A96E" : "rgba(255,255,255,0.03)",
                  color: isActive ? "#0A0A0A" : "rgba(255,255,255,0.38)",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.625rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  borderRadius: "2px",
                  fontWeight: isActive ? 600 : 400,
                  transition: "background 0.18s ease, border-color 0.18s ease, color 0.18s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(201,169,110,0.5)";
                    el.style.color = "rgba(255,255,255,0.75)";
                    el.style.background = "rgba(201,169,110,0.07)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.1)";
                    el.style.color = "rgba(255,255,255,0.38)";
                    el.style.background = "rgba(255,255,255,0.03)";
                  }
                }}
              >
                {f === "All" ? `All (${PROJECTS.filter((p) => !!p.imageKey).length})` : f}
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty state — no projects match the active filter */}
      {filteredProjects.length === 0 && (
        <div
          style={{
            position: "absolute",
            top: isMobile ? "6rem" : "8rem",
            bottom: isMobile ? "4.5rem" : "5rem",
            left: 0,
            right: 0,
            zIndex: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            background: "rgba(10,10,10,0.55)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.5rem",
              color: "rgba(240,235,224,0.55)",
            }}
          >
            No images in this discipline yet.
          </p>
          <button
            onClick={() => setActiveFilter("All")}
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.6875rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#C9A96E",
              background: "none",
              border: "1px solid #C9A96E40",
              padding: "0.5rem 1.25rem",
              cursor: "pointer",
              borderRadius: "2px",
            }}
          >
            View all work
          </button>
        </div>
      )}

      {/* Loading state while signed URLs resolve */}
      {navigableProjects.length > 0 && imageLoading && !allFailed && (
        <div
          style={{
            position: "absolute",
            top: isMobile ? "6rem" : "8rem",
            bottom: isMobile ? "4.5rem" : "5rem",
            left: 0,
            right: 0,
            zIndex: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(240,235,224,0.55)",
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.75rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            background: "rgba(10,10,10,0.3)",
          }}
        >
          Loading images...
        </div>
      )}

      {/* Error state when all images in this filter failed */}
      {allFailed && (
        <div
          style={{
            position: "absolute",
            top: isMobile ? "6rem" : "8rem",
            bottom: isMobile ? "4.5rem" : "5rem",
            left: 0,
            right: 0,
            zIndex: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(240,235,224,0.55)",
            fontFamily: "var(--font-playfair)",
            fontSize: "1.25rem",
            background: "rgba(10,10,10,0.4)",
          }}
        >
          Unable to load images for this filter.
        </div>
      )}

      {/* Bottom controls bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 12,
          height: isMobile ? "4.5rem" : "5rem",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(8,8,8,0.72)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "0 1rem" : "0 1.5rem",
        }}
      >
        <button
          onClick={() => go("prev")}
          aria-label="Previous image"
          style={{
            width: "2.75rem",
            height: "2.75rem",
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.04)",
            color: "#F0EBE0",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 3L5 8l5 5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.6875rem",
            letterSpacing: "0.16em",
            fontFamily: "var(--font-geist-mono)",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          {activeFilter === "All" ? "All" : activeFilter} · {displayIndex} / {navigableProjects.length}
        </div>

        <button
          onClick={() => go("next")}
          aria-label="Next image"
          style={{
            width: "2.75rem",
            height: "2.75rem",
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.04)",
            color: "#F0EBE0",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 3l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function WorkPage() {
  return (
    <Suspense>
      <WorkPageContent />
    </Suspense>
  );
}
