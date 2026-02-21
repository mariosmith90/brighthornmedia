"use client";

import { MARQUEE_ITEMS } from "@/app/lib/data";

interface MarqueeSectionProps {
  onOpenWork: (filter?: string) => void;
}

export default function MarqueeSection({ onOpenWork }: MarqueeSectionProps) {
  return (
    <div
      style={{
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        overflow: "hidden",
        padding: "1rem 0",
      }}
    >
      <div
        className="marquee-track"
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "paused")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "running")}
      >
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <a
            key={i}
            href="#"
            onClick={(e) => { e.preventDefault(); onOpenWork(item.filter); }}
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)",
              color: "var(--muted)",
              whiteSpace: "nowrap",
              padding: "0 2.5rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "2.5rem",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--foreground)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
          >
            {item.label}
            <span style={{ color: "var(--accent)", fontSize: "1rem" }}>✦</span>
          </a>
        ))}
      </div>
    </div>
  );
}
