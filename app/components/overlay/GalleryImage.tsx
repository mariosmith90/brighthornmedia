"use client";

import Image from "next/image";
import { useRef } from "react";
import { Project } from "@/app/lib/projects";

interface GalleryImageProps {
  project: Project;
  imageUrl: string | null;
  onGo: (dir: "next" | "prev") => void;
  onError: (id: number) => void;
}

export default function GalleryImage({ project, imageUrl, onGo, onError }: GalleryImageProps) {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#050505",
        zIndex: 3,
        overflow: "hidden",
        opacity: imageUrl ? 1 : 0,
        transition: "opacity 0.4s ease",
        cursor: "grab",
      }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null || touchStartY.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        const dy = e.changedTouches[0].clientY - touchStartY.current;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
          onGo(dx < 0 ? "next" : "prev");
        }
        touchStartX.current = null;
        touchStartY.current = null;
      }}
    >
      {imageUrl && (
        <Image
          key={project.id}
          src={imageUrl}
          alt={project.title}
          fill
          priority
          style={{ objectFit: "contain", objectPosition: "center" }}
          onError={() => onError(project.id)}
        />
      )}
    </div>
  );
}
