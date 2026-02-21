"use client";

import { SERVICES } from "@/app/lib/data";

export default function ServicesSection() {
  return (
    <section id="services" className="px-8 md:px-14 py-24 lg:py-32 max-w-[1400px] mx-auto">
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
            <em style={{ fontStyle: "italic", color: "var(--muted)" }}>for the serious.</em>
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

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-px"
        style={{ border: "1px solid var(--border)" }}
      >
        {SERVICES.map((service, i) => (
          <div
            key={service.number}
            className="bento-card p-8 lg:p-10 flex flex-col justify-between min-h-64 cursor-default"
            style={{
              border: "1px solid var(--border)",
              marginTop: "-1px",
              marginLeft: "-1px",
              background: i === 0 || i === 3 ? "var(--surface)" : "var(--background)",
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
  );
}
