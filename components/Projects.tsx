import Image from "next/image";
import { ArrowUpRightIcon, GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";
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

export function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="bg-rust">
      <div className="mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-32">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight lowercase md:text-5xl">things i&apos;ve built</h2>
        </Reveal>

        {/* Featured project: image + text split, stacks on mobile */}
        <Reveal delay={0.05} className="mt-12">
          <article className="group grid grid-cols-1 overflow-hidden rounded-2xl bg-surface md:grid-cols-5">
            <div className="relative aspect-16/10 overflow-hidden md:col-span-3 md:aspect-auto md:min-h-105">
              <Image
                src={featured.image}
                alt={`Screenshot of ${featured.title}`}
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
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
                <div className="relative aspect-16/10 overflow-hidden rounded-2xl bg-surface">
                  <Image
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
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
      </div>
    </section>
  );
}
