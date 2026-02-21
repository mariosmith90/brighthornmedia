"use client";

interface DotIndicatorsProps {
  count: number;
  current: number;
  showSwipeHint: boolean;
}

export default function DotIndicators({ count, current, showSwipeHint }: DotIndicatorsProps) {
  if (count <= 1) return null;

  return (
    <>
      {/* Swipe hint — fades out after mount */}
      {showSwipeHint && (
        <div
          style={{
            position: "absolute",
            bottom: "3.25rem",
            left: 0,
            right: 0,
            zIndex: 13,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            opacity: 1,
            transition: "opacity 0.6s ease",
            pointerEvents: "none",
          }}
        >
          <SwipeArrow />
          <span
            style={{
              color: "rgba(240,235,224,0.4)",
              fontSize: "0.625rem",
              letterSpacing: "0.18em",
              fontFamily: "var(--font-geist-mono)",
              textTransform: "uppercase",
            }}
          >
            Swipe
          </span>
          <SwipeArrow flip />
        </div>
      )}

      {/* Dot row */}
      <div
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: 0,
          right: 0,
          zIndex: 13,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.4rem",
          pointerEvents: "none",
        }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            style={{
              width: i === current ? "1.5rem" : "0.375rem",
              height: "0.375rem",
              borderRadius: "999px",
              background: i === current ? "rgba(240,235,224,0.9)" : "rgba(240,235,224,0.25)",
              transition: "width 0.3s ease, background 0.3s ease",
            }}
          />
        ))}
      </div>
    </>
  );
}

function SwipeArrow({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="16"
      height="10"
      viewBox="0 0 16 10"
      fill="none"
      style={{ opacity: 0.5, transform: flip ? "scaleX(-1)" : undefined }}
    >
      <path
        d="M1 5h14M10 1l4 4-4 4"
        stroke="#F0EBE0"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
