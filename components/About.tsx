import { about, skills } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SkillBoard } from "./SkillBoard";

export function About() {
  return (
    <section id="about" className="bg-olive">
      <div className="mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-32">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <h2 className="text-3xl font-semibold tracking-tight lowercase md:text-5xl">about me</h2>
            <div className="mt-8 flex max-w-[65ch] flex-col gap-5 text-lg leading-relaxed text-muted">
              {about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-7">
            <h3 className="sr-only">Skills</h3>
            <SkillBoard skills={skills} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
