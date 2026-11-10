// All personal content for the site lives here. Edit this file, not the components.
// Anything marked TODO still needs replacing.

export const site = {
  name: "Athul Jomon",
  firstName: "Athul",
  // Shown in the nav. `url` is used for metadata, the sitemap and social previews.
  website: "athul.co.uk",
  url: "https://athul.co.uk",
  // Shown big on the second screen. Keep it short, no full stop.
  intro: "Penultimate year MEng Computer Science student at the University of Bristol",
  email: "athul@athul.co.uk",
  links: {
    github: "https://github.com/aathull",
    linkedin: "https://www.linkedin.com/in/athul-jomon-898b3a22b/",
  },
  portrait: "/me.jpg",
};

export type Project = {
  title: string;
  description: string;
  stack: string[];
  // Optional for in-progress projects: they fall back to a striped "under construction" panel.
  image?: string;
  repo?: string;
  live?: string;
  // "building" moves the project into the "currently building" row with a caution-tape banner.
  status?: "building";
};

// The first project is shown large as the featured one.
// Screenshots live in public/projects/. Keep them around 1600px wide and under ~500 KB (WebP is ideal).
// `repo` and `live` are optional: leave `repo` out for private code and no "code" link is shown.
export const projects: Project[] = [
  {
    title: "The History Teacher Platform",
    description:
      "A full-stack revision platform for a history GCSE YouTuber, where students take topic-based quizzes, track their progress, and ask questions. Backed by test suites with over 80% line coverage, run automatically in CI.",
    stack: ["React", "Node.js", "Express", "Prisma", "PostgreSQL"],
    image: "/projects/TheHistoryTeacher.png",
  },
  {
    title: "Parallel & Distributed Game of Life",
    description:
      "Conway's Game of Life in Go, parallelised with goroutines for a 1.94x speedup, then split into a distributed system with the compute server on AWS EC2.",
    stack: ["Go", "RPC", "AWS EC2"],
    image: "/projects/GOL.webp",
  },
  {
    title: "Scotland Yard AI",
    description:
      "The Scotland Yard board game in Java, with an AI for Mr. X that picks its moves using minimax search and alpha-beta pruning.",
    stack: ["Java"],
    image: "/projects/ScotlandYard.webp",
  },
  // In-progress projects: `status: "building"` puts them in the "currently building" row. No image needed.
  {
    title: "Phonetroller",
    description:
      "Play 1v1 games with friends using your phones as controllers. Open the game on a shared screen, scan the QR code, and your phone's button presses are sent live to the host over WebSockets.",
    stack: ["Next.js", "TypeScript", "WebSockets"],
    repo: "https://github.com/aathull/Phonetroller-games",
    status: "building",
  },
];

export const about = [
  "I'm studying for an MEng in Computer Science at the University of Bristol. I like building across the stack, from backend systems to frontend interfaces, and I enjoy learning about new technologies!",
  "Outside of coursework I founded my sixth form's first Computer Science Society, was General Secretary of the University of Bristol Malayali Soc, and work as a cleaning and catering assistant at University Hospitals Bristol and Weston.",
];

// Shown as pills in the About section, and used as the bricks in the Breakout game.
export const skills = [
  "Python",
  "Java",
  "JavaScript",
  "TypeScript",
  "Go",
  "Haskell",
  "SQL",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "Prisma",
  "PostgreSQL",
  "AWS",
  "Git",
];
