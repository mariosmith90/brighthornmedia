export default function TestimonialSection() {
  return (
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
          &ldquo;
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
          Brighthorn didn&apos;t just shoot our campaign — they shaped how our entire
          brand feels. The images still give us chills six months later.
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
            <p style={{ color: "var(--foreground)", fontSize: "0.875rem", fontWeight: 500 }}>
              Morgan Ellis
            </p>
            <p style={{ color: "var(--muted)", fontSize: "0.8125rem" }}>
              Creative Director, Vela Studio
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
