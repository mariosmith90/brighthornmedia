"use client";

import { useState } from "react";
import WorkOverlay from "./components/WorkOverlay";
import SiteNav from "./components/home/SiteNav";
import HeroSection from "./components/home/HeroSection";
import MarqueeSection from "./components/home/MarqueeSection";
import ServicesSection from "./components/home/ServicesSection";
import ProcessSection from "./components/home/ProcessSection";
import TestimonialSection from "./components/home/TestimonialSection";
import CtaSection from "./components/home/CtaSection";
import SiteFooter from "./components/home/SiteFooter";

export default function Home() {
  const [workOpen, setWorkOpen] = useState(false);
  const [workFilter, setWorkFilter] = useState("All");

  const openWork = (filter?: string) => {
    setWorkFilter(filter ?? "All");
    setWorkOpen(true);
  };

  return (
    <div style={{ background: "var(--background)", color: "var(--foreground)" }} className="min-h-screen">
      <SiteNav onOpenWork={openWork} />
      <HeroSection onOpenWork={openWork} />
      <MarqueeSection onOpenWork={openWork} />
      <ServicesSection />
      <ProcessSection />
      <TestimonialSection />
      <CtaSection />
      <WorkOverlay open={workOpen} initialFilter={workFilter} onClose={() => setWorkOpen(false)} />
      <SiteFooter />
    </div>
  );
}
