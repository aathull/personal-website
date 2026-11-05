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
  // TODO: put a photo at public/me.jpg and change this to "/me.jpg"
  portrait: "https://picsum.photos/seed/athul-portrait/800/1000",
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
// TODO: replace the placeholder images with screenshots (put them in public/projects/)
// TODO: point each repo at the actual repository (or remove it if the code is private), and add `live` if there's a live site
export const projects: Project[] = [
  {
    title: "The History Teacher Platform",
    description:
      "A full-stack revision platform for a history GCSE YouTuber, where students take topic-based quizzes, track their progress, and ask questions. Backed by test suites with over 80% line coverage, run automatically in CI.",
    stack: ["React", "Node.js", "Express", "Prisma", "PostgreSQL"],
    image: "https://picsum.photos/seed/athul-history-teacher/1400/900",
    repo: "https://github.com/aathull",
  },
  {
    title: "Parallel & Distributed Game of Life",
    description:
      "Conway's Game of Life in Go, parallelised with goroutines for a 1.94x speedup, then split into a distributed system with the compute server on AWS EC2.",
    stack: ["Go", "RPC", "AWS EC2"],
    image: "https://picsum.photos/seed/athul-game-of-life/1000/700",
    repo: "https://github.com/aathull",
  },
  {
    title: "Scotland Yard AI",
    description:
      "The Scotland Yard board game in Java, with an AI for Mr. X that picks its moves using minimax search and alpha-beta pruning.",
    stack: ["Java"],
    image: "https://picsum.photos/seed/athul-scotland-yard/1000/700",
    repo: "https://github.com/aathull",
  },
  // In-progress projects go in this same list with `status: "building"`. No image needed. For example:
  // {
  //   title: "Something new",
  //   description: "One or two lines on what it is and what you're working on right now.",
  //   stack: ["TypeScript", "Go"],
  //   status: "building",
  // },
];

// TODO: tweak so it sounds like you
export const about = [
  "I'm studying for an MEng in Computer Science at the University of Bristol. I like building things end to end, from full-stack web apps with React and Node.js to concurrent and distributed systems in Go.",
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
