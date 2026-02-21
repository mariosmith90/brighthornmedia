const SOCIALS = ["Instagram", "Vimeo", "LinkedIn"] as const;

export default function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--background)",
      }}
      className="px-8 md:px-14 py-10"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <a
          href="/"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "var(--foreground)",
            fontSize: "1.4rem",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Brighthorn<span style={{ color: "var(--accent)" }}>.</span>
        </a>

        <div className="flex flex-wrap gap-6">
          {SOCIALS.map((social) => (
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

        <span style={{ color: "var(--muted)", fontSize: "0.75rem", letterSpacing: "0.05em" }}>
          © 2026 Brighthorn Media. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
