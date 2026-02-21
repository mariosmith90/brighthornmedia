"use client";

import { Filter, FILTERS, PROJECTS } from "@/app/lib/projects";

interface FilterPillsProps {
  activeFilter: Filter;
  onChange: (f: Filter) => void;
  isMobile: boolean;
}

export default function FilterPills({ activeFilter, onChange, isMobile }: FilterPillsProps) {
  const totalWithImages = PROJECTS.filter((p) => !!p.imageKey).length;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.375rem",
        padding: isMobile ? "0 2rem 0.75rem" : "0 3.5rem 1rem",
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
            onClick={() => onChange(f)}
            style={{
              flexShrink: 0,
              height: "1.75rem",
              padding: "0 0.875rem",
              border: isActive ? "1px solid #C9A96E" : "1px solid rgba(255,255,255,0.1)",
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
              if (isActive) return;
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(201,169,110,0.5)";
              el.style.color = "rgba(255,255,255,0.75)";
              el.style.background = "rgba(201,169,110,0.07)";
            }}
            onMouseLeave={(e) => {
              if (isActive) return;
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(255,255,255,0.1)";
              el.style.color = "rgba(255,255,255,0.38)";
              el.style.background = "rgba(255,255,255,0.03)";
            }}
          >
            {f === "All" ? `All (${totalWithImages})` : f}
          </button>
        );
      })}
    </div>
  );
}
