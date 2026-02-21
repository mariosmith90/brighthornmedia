export default function CtaSection() {
  return (
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
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>great?</em>
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
            We take on a limited number of projects each quarter. Reach out early to
            secure your spot.
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
              ((e.currentTarget as HTMLElement).style.background = "var(--accent-hover)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "var(--accent)")
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
  );
}
