"use client";

import { useEffect, useRef } from "react";

interface HeroSectionProps {
  onOpenWork: (filter?: string) => void;
}

export default function HeroSection({ onOpenWork }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="relative flex flex-col justify-start min-h-[72vh] md:min-h-[80vh] pt-16 overflow-hidden"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      {/* Parallax background */}
      <div
        ref={heroRef}
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 60% 40%, #1a1208 0%, #0A0A0A 70%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            opacity: 0.4,
          }}
        />
      </div>

      <div
        className="absolute top-24 right-12 hidden lg:block"
        style={{ color: "var(--muted)", fontSize: "0.6875rem", letterSpacing: "0.15em" }}
      >
        <span className="uppercase">Est. 2017</span>
      </div>

      <div className="relative z-10 px-8 md:px-14 pt-20 md:pt-24 lg:pt-28 pb-2 md:pb-4 max-w-[1400px] mx-auto w-full">
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "var(--foreground)",
          }}
          className="text-[clamp(3rem,8vw,8rem)] font-bold max-w-5xl"
        >
          We craft visuals
          <br />
          that carry
          <em style={{ color: "var(--accent)", fontStyle: "italic" }}> weight.</em>
        </h1>

        <p
          style={{ color: "var(--muted)", maxWidth: "42ch", lineHeight: 1.75 }}
          className="mt-8 text-base md:text-lg"
        >
          Brighthorn Media is a photography and videography studio built for brands
          and storytellers who refuse to blend in. Based in the Pacific Northwest.
          Working worldwide.
        </p>

        <div className="flex flex-col sm:flex-row items-start gap-4 mt-12">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onOpenWork(); }}
            style={{
              background: "var(--foreground)",
              color: "var(--background)",
              fontWeight: 600,
              fontSize: "0.875rem",
              letterSpacing: "0.02em",
              padding: "0.875rem 2rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            See Our Work
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="mailto:mario@brighthornmedia.com"
            style={{
              color: "var(--foreground)",
              fontWeight: 500,
              fontSize: "0.875rem",
              letterSpacing: "0.02em",
              padding: "0.875rem 2rem",
              border: "1px solid var(--border)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--muted)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
          >
            Get in Touch
          </a>
        </div>
      </div>

    </section>
  );
}
