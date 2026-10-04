import { site } from "@/lib/content";

const links = [
  { href: "#projects", label: "projects" },
  { href: "#about", label: "about" },
  { href: "#contact", label: "contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
        <a href="#top" className="font-semibold tracking-tight lowercase">
          {"athul.co.uk"}
        </a>
        <ul className="flex items-center gap-5 text-sm text-muted md:gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-foreground focus-visible:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
