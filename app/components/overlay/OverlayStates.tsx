"use client";

interface OverlayStatesProps {
  isEmpty: boolean;
  isLoading: boolean;
  allFailed: boolean;
  onReset: () => void;
}

const OVERLAY_BASE: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  zIndex: 6,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export default function OverlayStates({ isEmpty, isLoading, allFailed, onReset }: OverlayStatesProps) {
  if (isEmpty) {
    return (
      <div style={{ ...OVERLAY_BASE, gap: "1rem", background: "rgba(10,10,10,0.55)" }}>
        <p
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "1.5rem",
            color: "rgba(240,235,224,0.55)",
          }}
        >
          No images in this discipline yet.
        </p>
        <button
          onClick={onReset}
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.6875rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#C9A96E",
            background: "none",
            border: "1px solid #C9A96E40",
            padding: "0.5rem 1.25rem",
            cursor: "pointer",
            borderRadius: "2px",
          }}
        >
          View all work
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        style={{
          ...OVERLAY_BASE,
          background: "rgba(10,10,10,0.3)",
          color: "rgba(240,235,224,0.55)",
          fontFamily: "var(--font-geist-mono)",
          fontSize: "0.75rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        Loading images...
      </div>
    );
  }

  if (allFailed) {
    return (
      <div
        style={{
          ...OVERLAY_BASE,
          background: "rgba(10,10,10,0.4)",
          color: "rgba(240,235,224,0.55)",
          fontFamily: "var(--font-playfair)",
          fontSize: "1.25rem",
        }}
      >
        Unable to load images for this filter.
      </div>
    );
  }

  return null;
}
