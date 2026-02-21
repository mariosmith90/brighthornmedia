"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const MARQUEE_ITEMS = [
  { label: "Commercial",    filter: "Commercial" },
  { label: "Documentary",   filter: "Documentary" },
  { label: "Corporate",     filter: "Corporate" },
  { label: "Sports",        filter: "Sports" },
  { label: "Editorial",     filter: "Editorial" },
  { label: "Architectural", filter: "Architectural" },
  { label: "Portrait",      filter: "Portrait" },
];

const SERVICES = [
  {
    number: "01",
    title: "Photography",
    description:
      "Editorial, commercial, and lifestyle photography engineered to stop the scroll — images that hold atmosphere long after first glance.",
    tags: ["Brand", "Editorial", "Portrait", "Real Estate"],
    size: "large",
  },
  {
    number: "02",
    title: "Videography",
    description:
      "Cinematic video production from concept through delivery. Brand films, event reels, and documentary work built to endure.",
    tags: ["Brand Film", "Event", "Documentary"],
    size: "small",
  },
  {
    number: "03",
    title: "Post Production",
    description:
      "Color grading, editing, and finishing that transforms raw footage into something premium.",
    tags: ["Color Grade", "Edit", "Sound"],
    size: "small",
  },
  {
    number: "04",
    title: "Campaign Strategy",
    description:
      "Visual storytelling rooted in strategy. We work with you to develop concepts that align with your brand's larger narrative.",
    tags: ["Creative Direction", "Concept", "Rollout"],
    size: "large",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Discovery",
    body: "We start with a deep-dive conversation. Your brand, your audience, your vision — we learn what success looks like before we pick up a camera.",
  },
  {
    step: "02",
    title: "Pre-Production",
    body: "Moodboards, shot lists, location scouting, talent coordination. Every detail is locked before day-of so the shoot runs smooth.",
  },
  {
    step: "03",
    title: "Production",
    body: "We show up fully equipped and fully prepared. Calm, efficient, and focused on capturing something real.",
  },
  {
    step: "04",
    title: "Delivery",
    body: "Edited, graded, and delivered on time. We don't hand off files — we hand off finished work ready to publish.",
  },
];

const STATS = [
  { value: "200+", label: "Projects Completed" },
  { value: "8", label: "Years in the Field" },
  { value: "40+", label: "Brand Clients" },
  { value: "3", label: "National Awards" },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Signed URLs for portfolio cards that have real photos
  const [homeImgUrls, setHomeImgUrls] = useState<Record<string, string>>({});
  useEffect(() => {
    const entries = [
      { discipline: "Sports", key: "portfolio/Sports/Web/02:19:26/DSC01753.webp" },
    ];
    entries.forEach(({ discipline, key }) => {
      fetch(`/api/media?key=${encodeURIComponent(key)}`)
        .then((r) => r.json())
        .then((data: { url?: string }) => {
          if (data.url) setHomeImgUrls((prev) => ({ ...prev, [discipline]: data.url! }));
        })
        .catch(() => {});
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{ background: "var(--background)", color: "var(--foreground)" }}
      className="min-h-screen"
    >
      {/* ── NAV ── */}
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
        <span
          style={{
            fontFamily: "var(--font-playfair)",
            color: "var(--foreground)",
            letterSpacing: "-0.01em",
          }}
          className="text-base font-semibold tracking-tight"
        >
          Brighthorn<span style={{ color: "var(--accent)" }}>.</span>
        </span>

        <div className="hidden md:flex items-center gap-8">
          {["Work", "Services", "Process", "Contact"].map((item) => (
            <a
              key={item}
              href={item === "Work" ? "/work" : `#${item.toLowerCase()}`}
              className="animated-link text-sm"
              style={{ color: "var(--muted)", transition: "color 0.2s" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--foreground)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--muted)")
              }
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
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.background = "var(--accent-hover)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.background = "var(--accent)")
            }
          >
            Book a Call
          </a>
        </div>

        {/* Mobile menu indicator */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          aria-label="Menu"
        >
          <span
            style={{ background: "var(--foreground)" }}
            className="block w-5 h-px"
          />
          <span
            style={{ background: "var(--foreground)" }}
            className="block w-3 h-px"
          />
        </button>
      </nav>

      {/* ── HERO ── */}
      <section
        className="relative flex flex-col justify-start min-h-[72vh] md:min-h-[80vh] pt-16 overflow-hidden"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {/* Parallax background */}
        <div
          ref={heroRef}
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 60% 40%, #1a1208 0%, #0A0A0A 70%)",
          }}
        >
          {/* Subtle grid */}
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

        {/* Top-right accent */}
        <div
          className="absolute top-24 right-12 hidden lg:block"
          style={{ color: "var(--muted)", fontSize: "0.6875rem", letterSpacing: "0.15em" }}
        >
          <span className="uppercase">Est. 2017</span>
        </div>

        <div className="relative z-10 px-8 md:px-14 pt-20 md:pt-24 lg:pt-28 pb-2 md:pb-4 max-w-[1400px] mx-auto w-full">

          {/* Headline */}
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
            <em
              style={{ color: "var(--accent)", fontStyle: "italic" }}
            >
              {" "}weight.
            </em>
          </h1>

          <p
            style={{ color: "var(--muted)", maxWidth: "42ch", lineHeight: 1.75 }}
            className="mt-8 text-base md:text-lg"
          >
            Brighthorn Media is a photography and videography studio built for
            brands and storytellers who refuse to blend in. Based in the Pacific
            Northwest. Working worldwide.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4 mt-12">
            <a
              href="/work"
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
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.opacity = "0.85")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.opacity = "1")
              }
            >
              See Our Work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 7h12M8 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  "var(--muted)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  "var(--border)")
              }
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-8 md:left-14 flex items-center gap-3"
          style={{ color: "var(--muted)", fontSize: "0.6875rem", letterSpacing: "0.12em" }}
        >
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
            <rect
              x="1"
              y="1"
              width="10"
              height="18"
              rx="5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <circle
              cx="6"
              cy="6"
              r="2"
              fill="currentColor"
              style={{
                animation: "scrollBob 2s ease-in-out infinite",
              }}
            />
          </svg>
          <span className="uppercase">Scroll</span>
        </div>
      </section>

      {/* ── MARQUEE ── */}
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
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.animationPlayState = "paused")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.animationPlayState = "running")
          }
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <a
              key={i}
              href={`/work?filter=${encodeURIComponent(item.filter)}`}
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
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--foreground)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--muted)")
              }
            >
              {item.label}
              <span style={{ color: "var(--accent)", fontSize: "1rem" }}>
                ✦
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section
        id="services"
        className="px-8 md:px-14 py-24 lg:py-32 max-w-[1400px] mx-auto"
      >
        <div className="flex items-end justify-between mb-16">
          <div>
            <p
              style={{
                color: "var(--accent)",
                fontSize: "0.6875rem",
                letterSpacing: "0.2em",
                fontWeight: 500,
                marginBottom: "0.75rem",
              }}
              className="uppercase"
            >
              What We Do
            </p>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                color: "var(--foreground)",
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
            >
              Services built
              <br />
              <em style={{ fontStyle: "italic", color: "var(--muted)" }}>
                for the serious.
              </em>
            </h2>
          </div>
          <a
            href="#contact"
            className="hidden md:block animated-link text-sm"
            style={{ color: "var(--muted)" }}
          >
            View all services →
          </a>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ border: "1px solid var(--border)" }}>
          {SERVICES.map((service, i) => (
            <div
              key={service.number}
              className="bento-card p-8 lg:p-10 flex flex-col justify-between min-h-64 cursor-default"
              style={{
                border: "1px solid var(--border)",
                marginTop: "-1px",
                marginLeft: "-1px",
                background:
                  i === 0 || i === 3
                    ? "var(--surface)"
                    : "var(--background)",
              }}
            >
              <div className="flex items-start justify-between">
                <span
                  style={{
                    color: "var(--border)",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.15em",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {service.number}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{ color: "var(--border)", marginTop: "2px" }}
                >
                  <path
                    d="M3 13L13 3M13 3H5M13 3v8"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="mt-12">
                <h3
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    color: "var(--foreground)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    color: "var(--muted)",
                    fontSize: "0.9375rem",
                    lineHeight: 1.7,
                    maxWidth: "44ch",
                  }}
                >
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        border: "1px solid var(--border)",
                        color: "var(--muted)",
                        fontSize: "0.6875rem",
                        letterSpacing: "0.08em",
                        padding: "0.25rem 0.625rem",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
        }}
        className="px-8 md:px-14 py-16 md:py-20"
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <span
                className="stat-number font-bold"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  color: "var(--foreground)",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  color: "var(--muted)",
                  fontSize: "0.8125rem",
                  letterSpacing: "0.05em",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── PORTFOLIO PREVIEW ── */}
      <section
        id="work"
        className="px-8 md:px-14 py-24 lg:py-32 max-w-[1400px] mx-auto"
      >
        <div className="flex items-end justify-between mb-12">
          <div>
            <p
              style={{
                color: "var(--accent)",
                fontSize: "0.6875rem",
                letterSpacing: "0.2em",
                fontWeight: 500,
                marginBottom: "0.75rem",
              }}
              className="uppercase"
            >
              Selected Work
            </p>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              Recent Projects
            </h2>
          </div>
          <span
            style={{ color: "var(--muted)", fontSize: "0.8125rem" }}
          >
            2024 — 2026
          </span>
        </div>

        {/* Portfolio grid — all 6 disciplines, each links to its filtered work view */}
        {(() => {
          const items = [
            {
              discipline: "Commercial",
              title: "Cascade Ridge Outfitters",
              gradient: "linear-gradient(135deg, #1a1208 0%, #2e1f0f 50%, #0f0e0c 100%)",
              accent: "#C9A96E",
              glowColor: "rgba(201,169,110,0.15)",
              span: "md:col-span-7",
              aspect: "aspect-[4/3]",
            },
            {
              discipline: "Sports",
              title: "Ironclad Athletics",
              gradient: "linear-gradient(135deg, #0f0f15 0%, #14141f 50%, #080810 100%)",
              accent: "#9E6EC9",
              glowColor: "rgba(158,110,201,0.15)",
              span: "md:col-span-5",
              aspect: "aspect-[4/3]",
            },
            {
              discipline: "Documentary",
              title: "The Fishermen of Grays Harbor",
              gradient: "linear-gradient(135deg, #0a1520 0%, #0d1f30 50%, #080c10 100%)",
              accent: "#6E9EC9",
              glowColor: "rgba(110,158,201,0.15)",
              span: "md:col-span-4",
              aspect: "aspect-[3/4]",
            },
            {
              discipline: "Corporate",
              title: "Emerald City Summit",
              gradient: "linear-gradient(135deg, #150a0a 0%, #221010 50%, #0c0808 100%)",
              accent: "#C96E6E",
              glowColor: "rgba(201,110,110,0.15)",
              span: "md:col-span-4",
              aspect: "aspect-[3/4]",
            },
            {
              discipline: "Editorial",
              title: "North Sound Spirits",
              gradient: "linear-gradient(135deg, #15100a 0%, #221a0f 50%, #0c0a08 100%)",
              accent: "#C9B46E",
              glowColor: "rgba(201,180,110,0.15)",
              span: "md:col-span-4",
              aspect: "aspect-[3/4]",
            },
          ];

          return (
            <>
              {/* Row 1: two wide cards */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
                {items.slice(0, 2).map((item) => (
                  <a
                    key={item.discipline}
                    href={`/work?filter=${encodeURIComponent(item.discipline)}`}
                    className={`portfolio-item group cursor-pointer ${item.span}`}
                    style={{ display: "block", textDecoration: "none" }}
                  >
                    <div
                      className={`portfolio-img w-full ${item.aspect} relative`}
                      style={{ background: item.gradient }}
                    >
                      {/* Real image overlay — shown once the signed URL is fetched */}
                      {homeImgUrls[item.discipline] && (
                        <Image
                          src={homeImgUrls[item.discipline]}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          style={{ objectFit: "contain", objectPosition: "center", transition: "opacity 0.6s ease" }}
                        />
                      )}
                      <div
                        className="absolute inset-0 flex flex-col justify-end p-8"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 60%)",
                        }}
                      >
                        <span
                          style={{
                            color: item.accent,
                            fontSize: "0.6875rem",
                            letterSpacing: "0.2em",
                            fontFamily: "var(--font-mono)",
                            marginBottom: "0.4rem",
                            display: "block",
                            transition: "color 0.3s",
                          }}
                          className="uppercase"
                        >
                          {item.discipline}
                        </span>
                        <h3
                          style={{
                            fontFamily: "var(--font-playfair)",
                            fontSize: "1.375rem",
                            fontWeight: 600,
                            color: "var(--foreground)",
                            lineHeight: 1.2,
                          }}
                        >
                          {item.title}
                        </h3>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none">
                        <div
                          style={{
                            width: "220px",
                            height: "220px",
                            borderRadius: "50%",
                            border: `1px solid ${item.accent}`,
                            boxShadow: `0 0 60px 16px ${item.glowColor}`,
                          }}
                        />
                      </div>
                      {/* Hover arrow */}
                      <div
                        className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ color: item.accent }}
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M4 16L16 4M16 4H8M16 4v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Row 2: three portrait cards + Architectural CTA */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {items.slice(2).map((item) => (
                  <a
                    key={item.discipline}
                    href={`/work?filter=${encodeURIComponent(item.discipline)}`}
                    className={`portfolio-item group cursor-pointer portrait-card ${item.span}`}
                    style={{ display: "block", textDecoration: "none" }}
                  >
                    <div
                      className={`portfolio-img w-full ${item.aspect} relative`}
                      style={{ background: item.gradient }}
                    >
                      <div
                        className="absolute inset-0 flex flex-col justify-end p-6"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 55%)",
                        }}
                      >
                        <span
                          style={{
                            color: item.accent,
                            fontSize: "0.625rem",
                            letterSpacing: "0.2em",
                            fontFamily: "var(--font-mono)",
                            marginBottom: "0.35rem",
                            display: "block",
                          }}
                          className="uppercase"
                        >
                          {item.discipline}
                        </span>
                        <h3
                          style={{
                            fontFamily: "var(--font-playfair)",
                            fontSize: "1.0625rem",
                            fontWeight: 600,
                            color: "var(--foreground)",
                            lineHeight: 1.25,
                          }}
                        >
                          {item.title}
                        </h3>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none">
                        <div
                          style={{
                            width: "140px",
                            height: "140px",
                            borderRadius: "50%",
                            border: `1px solid ${item.accent}`,
                            boxShadow: `0 0 40px 10px ${item.glowColor}`,
                          }}
                        />
                      </div>
                      <div
                        className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ color: item.accent }}
                      >
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                          <path d="M4 16L16 4M16 4H8M16 4v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </a>
                ))}
                {/* Architectural — dark call-to-action tile */}
                <a
                  href="/work?filter=Architectural"
                  className="portfolio-item group cursor-pointer md:col-span-4"
                  style={{ display: "block", textDecoration: "none" }}
                >
                  <div
                    className="portfolio-img w-full aspect-[3/4] relative flex flex-col items-center justify-center gap-4"
                    style={{
                      background: "linear-gradient(135deg, #0f1510 0%, #182210 50%, #0a0f08 100%)",
                      border: "1px solid rgba(142,201,110,0.1)",
                    }}
                  >
                    <span
                      style={{
                        color: "#8EC96E",
                        fontSize: "0.625rem",
                        letterSpacing: "0.2em",
                        fontFamily: "var(--font-mono)",
                      }}
                      className="uppercase"
                    >
                      Architectural
                    </span>
                    <p
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: "1.0625rem",
                        fontWeight: 600,
                        color: "var(--foreground)",
                        textAlign: "center",
                        padding: "0 1.5rem",
                        lineHeight: 1.3,
                      }}
                    >
                      Vela Studio Rebrand
                    </p>
                    <div
                      className="group-hover:translate-y-[-2px] transition-transform duration-300"
                      style={{
                        marginTop: "0.25rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        color: "#8EC96E",
                        fontSize: "0.6875rem",
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      View work
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                        <path d="M4 16L16 4M16 4H8M16 4v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none">
                      <div style={{ width: "140px", height: "140px", borderRadius: "50%", border: "1px solid #8EC96E", boxShadow: "0 0 40px 10px rgba(142,201,110,0.12)" }} />
                    </div>
                  </div>
                </a>
              </div>
            </>
          );
        })()}

        <div className="mt-8 flex justify-center">
          <a
            href="/work"
            className="animated-link text-sm"
            style={{ color: "var(--muted)", letterSpacing: "0.05em" }}
          >
            View full portfolio →
          </a>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section
        id="process"
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
        className="px-8 md:px-14 py-24 lg:py-32"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p
              style={{
                color: "var(--accent)",
                fontSize: "0.6875rem",
                letterSpacing: "0.2em",
                fontWeight: 500,
                marginBottom: "0.75rem",
              }}
              className="uppercase"
            >
              How We Work
            </p>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              From first call to final file.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ border: "1px solid var(--border)" }}>
            {PROCESS.map((step, i) => (
              <div
                key={step.step}
                className="p-8 flex flex-col gap-6"
                style={{
                  border: "1px solid var(--border)",
                  marginTop: "-1px",
                  marginLeft: "-1px",
                  background: i % 2 === 0 ? "var(--background)" : "var(--surface)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    color: "var(--accent)",
                    letterSpacing: "0.12em",
                  }}
                >
                  {step.step}
                </span>
                <div
                  style={{
                    width: "32px",
                    height: "1px",
                    background: "var(--border)",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.375rem",
                    fontWeight: 600,
                    color: "var(--foreground)",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: "var(--muted)",
                    fontSize: "0.875rem",
                    lineHeight: 1.75,
                  }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="px-8 md:px-14 py-24 lg:py-32 max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "4rem",
              color: "var(--border)",
              lineHeight: 0.5,
              marginBottom: "2rem",
              display: "block",
            }}
          >
            "
          </span>
          <blockquote
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.375rem, 3vw, 2rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--foreground)",
              lineHeight: 1.5,
              letterSpacing: "-0.01em",
            }}
          >
            Brighthorn didn&apos;t just shoot our campaign — they shaped how our
            entire brand feels. The images still give us chills six months later.
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            />
            <div className="text-left">
              <p
                style={{ color: "var(--foreground)", fontSize: "0.875rem", fontWeight: 500 }}
              >
                Morgan Ellis
              </p>
              <p
                style={{ color: "var(--muted)", fontSize: "0.8125rem" }}
              >
                Creative Director, Vela Studio
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        id="contact"
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
        }}
        className="px-8 md:px-14 py-24 lg:py-32"
      >
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12">
          <div>
            <p
              style={{
                color: "var(--accent)",
                fontSize: "0.6875rem",
                letterSpacing: "0.2em",
                fontWeight: 500,
                marginBottom: "1rem",
              }}
              className="uppercase"
            >
              Let&apos;s Work Together
            </p>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2.5rem, 6vw, 6rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.0,
                color: "var(--foreground)",
              }}
            >
              Ready to make
              <br />
              something{" "}
              <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
                great?
              </em>
            </h2>
          </div>

          <div className="flex flex-col gap-4 lg:items-end lg:text-right">
            <p
              style={{
                color: "var(--muted)",
                fontSize: "0.9375rem",
                maxWidth: "36ch",
                lineHeight: 1.7,
              }}
            >
              We take on a limited number of projects each quarter. Reach out
              early to secure your spot.
            </p>
            <a
              href="mailto:mario@brighthornmedia.com"
              style={{
                background: "var(--accent)",
                color: "#0A0A0A",
                fontWeight: 700,
                fontSize: "0.9375rem",
                letterSpacing: "0.04em",
                padding: "1rem 2.5rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.625rem",
                transition: "background 0.2s",
                marginTop: "0.5rem",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "var(--accent-hover)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "var(--accent)")
              }
            >
              Start a Project
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 7h12M8 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="mailto:mario@brighthornmedia.com"
              className="animated-link text-sm"
              style={{ color: "var(--muted)" }}
            >
              mario@brighthornmedia.com
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          background: "var(--background)",
        }}
        className="px-8 md:px-14 py-10"
      >
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <span
            style={{
              fontFamily: "var(--font-playfair)",
              color: "var(--foreground)",
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            Brighthorn<span style={{ color: "var(--accent)" }}>.</span>
          </span>

          <div className="flex flex-wrap gap-6">
            {["Instagram", "Vimeo", "LinkedIn"].map((social) => (
              <a
                key={social}
                href="#"
                className="animated-link"
                style={{
                  color: "var(--muted)",
                  fontSize: "0.8125rem",
                  letterSpacing: "0.05em",
                }}
              >
                {social}
              </a>
            ))}
          </div>

          <span
            style={{ color: "var(--muted)", fontSize: "0.75rem", letterSpacing: "0.05em" }}
          >
            © 2026 Brighthorn Media. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}

