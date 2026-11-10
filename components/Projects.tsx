import Image from "next/image";
import { ArrowUpRightIcon, BarricadeIcon, GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { projects, type Project } from "@/lib/content";
import { Reveal } from "./Reveal";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-4 text-sm font-medium">
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-accent hover:underline"
        >
          live site <ArrowUpRightIcon size={14} weight="bold" />
        </a>
      )}
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-muted hover:text-foreground"
        >
          <GithubLogoIcon size={16} weight="bold" /> code
        </a>
      )}
    </div>
  );
}

function Stack({ items }: { items: string[] }) {
  return <p className="font-mono text-xs text-muted">{items.join(" / ")}</p>;
}

const zoom =
  "object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]";

// Screenshot if there is one, otherwise hazard stripes with a barricade icon.
function ProjectImage({ project, sizes, dim }: { project: Project; sizes: string; dim?: boolean }) {
  if (!project.image) {
    return (
      <div
        aria-hidden
        className="absolute inset-0 grid place-items-center text-accent"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, rgb(255 224 138 / 0.10) 0 22px, transparent 22px 44px)",
        }}
      >
        <BarricadeIcon size={56} weight="duotone" />
      </div>
    );
  }
  return (
    <Image
      src={project.image}
      alt={`Screenshot of ${project.title}`}
      fill
      sizes={sizes}
      className={`${zoom} ${dim ? "opacity-60 saturate-50" : ""}`}
    />
  );
}

// A strip of caution tape slapped across the card. Scrolls slowly unless reduced motion is on.
function BuildingTape() {
  const words = Array.from({ length: 8 }, () => "under construction");
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-[-10%] top-1/2 -translate-y-1/2 -rotate-6 overflow-hidden border-y-2 border-on-accent bg-accent py-2 shadow-[0_10px_30px_-10px_rgb(20_16_8/0.7)]"
    >
      <div className="flex w-max motion-safe:animate-tape">
        {[0, 1].map((copy) => (
          <p
            key={copy}
            className="flex shrink-0 items-center gap-6 pr-6 font-mono text-xs font-semibold tracking-widest text-on-accent uppercase"
          >
            {words.map((w, i) => (
              <span key={i} className="flex items-center gap-6">
                {w}
                <span className="inline-block size-1.5 rotate-45 bg-on-accent" />
              </span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
}

function BuildingCard({ project }: { project: Project }) {
  return (
    <article className="group">
      <div className="relative aspect-16/10 overflow-hidden rounded-md bg-surface">
        <ProjectImage project={project} sizes="(min-width: 768px) 50vw, 100vw" dim />
        <BuildingTape />
      </div>
      <div className="mt-5 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/60 px-2.5 py-0.5 font-mono text-xs text-accent lowercase">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full rounded-full bg-accent opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            in progress
          </span>
        </div>
        <p className="leading-relaxed text-muted">{project.description}</p>
        <Stack items={project.stack} />
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

export function Projects() {
  const shipped = projects.filter((p) => p.status !== "building");
  const building = projects.filter((p) => p.status === "building");
  const [featured, ...rest] = shipped;

  return (
    <section id="projects" className="bg-rust">
      <div className="mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-32">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight lowercase md:text-5xl">things i&apos;ve built</h2>
        </Reveal>

        {/* Featured project: image + text split, stacks on mobile */}
        <Reveal delay={0.05} className="mt-12">
          <article className="group grid grid-cols-1 overflow-hidden rounded-md bg-surface md:grid-cols-5">
            <div className="relative aspect-16/10 overflow-hidden md:col-span-3 md:aspect-auto md:min-h-105">
              <ProjectImage project={featured} sizes="(min-width: 768px) 60vw, 100vw" />
            </div>
            <div className="flex flex-col justify-between gap-8 p-6 md:col-span-2 md:p-10">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{featured.title}</h3>
                <p className="mt-4 leading-relaxed text-muted">{featured.description}</p>
              </div>
              <div className="flex flex-col gap-4">
                <Stack items={featured.stack} />
                <ProjectLinks project={featured} />
              </div>
            </div>
          </article>
        </Reveal>

        {/* Remaining projects: two columns on desktop, one on mobile */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {rest.map((project, i) => (
            <Reveal key={project.title} delay={0.05 * (i + 1)}>
              <article className="group">
                <div className="relative aspect-16/10 overflow-hidden rounded-md bg-surface">
                  <ProjectImage project={project} sizes="(min-width: 768px) 50vw, 100vw" />
                </div>
                <div className="mt-5 flex flex-col gap-3">
                  <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
                  <p className="leading-relaxed text-muted">{project.description}</p>
                  <Stack items={project.stack} />
                  <ProjectLinks project={project} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {building.length > 0 && (
          <div className="mt-24 md:mt-32">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight lowercase md:text-4xl">currently building</h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {building.map((project, i) => (
                <Reveal key={project.title} delay={0.05 * (i + 1)}>
                  <BuildingCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
