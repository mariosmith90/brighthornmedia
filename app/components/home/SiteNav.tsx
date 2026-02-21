"use client";

interface SiteNavProps {
  onOpenWork: (filter?: string) => void;
}

const NAV_LINKS = ["Work", "Services", "Process", "Contact"] as const;

export default function SiteNav({ onOpenWork }: SiteNavProps) {
  return (
    <nav
      style={{ borderBottom: "1px solid var(--border)" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-14 h-16"
      role="navigation"
    >
      <div
        style={{
          background: "rgba(10,10,10,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          position: "absolute",
          inset: 0,
          zIndex: -1,
        }}
      />

      <a
        href="/"
        style={{
          fontFamily: "var(--font-playfair)",
          color: "var(--foreground)",
          letterSpacing: "-0.01em",
          textDecoration: "none",
          fontSize: "1.4rem",
          fontWeight: 600,
        }}
      >
        Brighthorn<span style={{ color: "var(--accent)" }}>.</span>
      </a>

      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((item) => (
          <a
            key={item}
            href={item === "Work" ? "#" : `#${item.toLowerCase()}`}
            onClick={
              item === "Work"
                ? (e) => { e.preventDefault(); onOpenWork(); }
                : undefined
            }
            className="animated-link text-sm"
            style={{ color: "var(--muted)", transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--foreground)")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--muted)")}
          >
            {item}
          </a>
        ))}
        <a
          href="#contact"
          style={{
            background: "var(--accent)",
            color: "#0A0A0A",
            fontWeight: 600,
            fontSize: "0.8125rem",
            letterSpacing: "0.02em",
            padding: "0.5rem 1.25rem",
            borderRadius: "2px",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--accent-hover)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--accent)")}
        >
          Book a Call
        </a>
      </div>

      {/* Mobile menu indicator */}
      <button className="md:hidden flex flex-col gap-1.5" aria-label="Menu">
        <span style={{ background: "var(--foreground)" }} className="block w-5 h-px" />
        <span style={{ background: "var(--foreground)" }} className="block w-3 h-px" />
      </button>
    </nav>
  );
}
