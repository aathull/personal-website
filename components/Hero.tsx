"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDownIcon, ArrowDownRightIcon, GithubLogoIcon } from "@phosphor-icons/react";
import { site } from "@/lib/content";
import { Typewriter } from "./Typewriter";

const ease = [0.16, 1, 0.3, 1] as const;
const greeting = `hi, i'm ${site.firstName.toLowerCase()}`;
// Matches the Typewriter defaults: 300ms pause + 75ms per character.
const typingDone = (300 + greeting.length * 75) / 1000;

// Two screens, both on green:
// 1. just the greeting typing out, big
// 2. the intro line, buttons and photo, revealed on scroll
export function Hero() {
  const reduce = useReducedMotion();
  const reveal = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.8, delay, ease },
        };

  return (
    <>
      <section id="top" className="relative bg-olive">
        <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-6xl items-center px-4 md:px-8">
          <h1 className="text-6xl font-semibold leading-none tracking-tighter lowercase sm:text-7xl md:text-8xl lg:text-9xl">
            <Typewriter text={greeting} />
          </h1>
        </div>
        <motion.a
          href="#intro"
          aria-label="Scroll to intro"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: reduce ? 0 : typingDone + 0.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full p-2 text-muted transition-colors hover:text-foreground"
        >
          <motion.span
            className="block"
            animate={reduce ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDownIcon size={28} />
          </motion.span>
        </motion.a>
      </section>

      <section id="intro" className="bg-olive">
        <div className="mx-auto grid min-h-[90dvh] max-w-6xl grid-cols-1 items-center gap-12 px-4 py-24 md:grid-cols-12 md:gap-8 md:px-8">
          <div className="md:col-span-7">
            <motion.p
              {...reveal(0)}
              className="max-w-[24ch] text-3xl font-medium leading-tight tracking-tight md:text-4xl lg:text-5xl"
            >
              {site.intro}
            </motion.p>
            <motion.div {...reveal(0.1)} className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-accent px-6 py-3 font-medium text-on-accent transition-transform hover:-translate-y-0.5 active:translate-y-px"
              >
                view projects
                <ArrowDownRightIcon size={18} weight="bold" />
              </a>
              <a
                href={site.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line px-6 py-3 font-medium transition-colors hover:bg-surface active:translate-y-px"
              >
                <GithubLogoIcon size={18} weight="bold" />
                github
              </a>
            </motion.div>
          </div>

          <motion.div
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.94, rotate: 0 },
                  whileInView: { opacity: 1, scale: 1, rotate: 3 },
                  viewport: { once: true, amount: 0.3 },
                  transition: { duration: 0.9, delay: 0.15, ease },
                })}
            style={reduce ? { rotate: 3 } : undefined}
            whileHover={reduce ? undefined : { rotate: 0, scale: 1.02 }}
            className="mx-auto w-full max-w-xs md:col-span-5 md:max-w-sm"
          >
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-surface shadow-[0_24px_60px_-20px_rgb(20_16_8/0.6)]">
              <Image
                src={site.portrait}
                alt={`Portrait of ${site.name}`}
                fill
                sizes="(min-width: 768px) 384px, 320px"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
