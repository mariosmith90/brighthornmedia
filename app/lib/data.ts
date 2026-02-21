export const MARQUEE_ITEMS = [
  { label: "Commercial",    filter: "Commercial" },
  { label: "Documentary",   filter: "Documentary" },
  { label: "Corporate",     filter: "Corporate" },
  { label: "Sports",        filter: "Sports" },
  { label: "Editorial",     filter: "Editorial" },
  { label: "Architectural", filter: "Architectural" },
  { label: "Portrait",      filter: "Portrait" },
] as const;

export const SERVICES = [
  {
    number: "01",
    title: "Photography",
    description:
      "Editorial, commercial, and lifestyle photography engineered to stop the scroll — images that hold atmosphere long after first glance.",
    tags: ["Brand", "Editorial", "Portrait", "Real Estate"],
  },
  {
    number: "02",
    title: "Videography",
    description:
      "Cinematic video production from concept through delivery. Brand films, event reels, and documentary work built to endure.",
    tags: ["Brand Film", "Event", "Documentary"],
  },
  {
    number: "03",
    title: "Post Production",
    description:
      "Color grading, editing, and finishing that transforms raw footage into something premium.",
    tags: ["Color Grade", "Edit", "Sound"],
  },
  {
    number: "04",
    title: "Campaign Strategy",
    description:
      "Visual storytelling rooted in strategy. We work with you to develop concepts that align with your brand's larger narrative.",
    tags: ["Creative Direction", "Concept", "Rollout"],
  },
];

export const PROCESS = [
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
