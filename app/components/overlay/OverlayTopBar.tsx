"use client";

import FilterPills from "./FilterPills";
import { Filter } from "@/app/lib/projects";

interface OverlayTopBarProps {
  activeFilter: Filter;
  onFilterChange: (f: Filter) => void;
  isMobile: boolean;
}

export default function OverlayTopBar({
  activeFilter,
  onFilterChange,
  isMobile,
}: OverlayTopBarProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        background: "rgba(8,8,8,0.55)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Row 1: logo + count + Book Now */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "0.875rem 2rem" : "1.25rem 3.5rem",
        }}
      >
        <a
          href="/"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "#F0EBE0",
            fontSize: "1.4rem",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            textDecoration: "none",
          }}
        >
          Brighthorn<span style={{ color: "#C9A96E" }}>.</span>
        </a>

        <a
          href="mailto:mario@brighthornmedia.com"
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.6875rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#0A0A0A",
            background: "#C9A96E",
            padding: "0.4rem 1rem",
            borderRadius: "2px",
            fontWeight: 600,
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#E0C080")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#C9A96E")}
        >
          Book Now
        </a>
      </div>

      {/* Row 2: filter pills */}
      <FilterPills activeFilter={activeFilter} onChange={onFilterChange} isMobile={isMobile} />
    </div>
  );
}
