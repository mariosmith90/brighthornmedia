"use client";

import { PROCESS } from "@/app/lib/data";

export default function ProcessSection() {
  return (
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

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ border: "1px solid var(--border)" }}
        >
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
              <div style={{ width: "32px", height: "1px", background: "var(--border)" }} />
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
              <p style={{ color: "var(--muted)", fontSize: "0.875rem", lineHeight: 1.75 }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
