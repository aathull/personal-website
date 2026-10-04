import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";
import { site } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <footer className="border-t border-line bg-rust">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted lowercase md:flex-row md:justify-between md:px-8">
          <p>
            &copy; {new Date().getFullYear()} {site.name}
          </p>
          <p>built with next.js</p>
        </div>
      </footer>
    </>
  );
}
