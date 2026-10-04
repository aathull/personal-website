import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/content";
import { CopyEmail } from "./CopyEmail";
import { Reveal } from "./Reveal";

export function Contact() {
  const socials = [
    { href: site.links.github, label: "github", Icon: GithubLogoIcon },
    { href: site.links.linkedin, label: "linkedin", Icon: LinkedinLogoIcon },
  ].filter((s) => s.href);

  return (
    <section id="contact" className="bg-rust">
      <div className="mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-40">
        <Reveal className="flex flex-col items-center text-center">
          <h2 className="text-4xl font-semibold tracking-tighter lowercase md:text-7xl">say hello</h2>
          <p className="mt-6 max-w-[45ch] text-lg leading-relaxed text-muted">
            open to internships, collaborations, and chats about anything i&apos;ve built
          </p>
          <div className="mt-10 max-w-full">
            <CopyEmail email={site.email} />
            <p className="mt-3 text-sm text-muted">click to copy</p>
          </div>
          <ul className="mt-8 flex items-center gap-6 text-muted">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Icon size={20} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
