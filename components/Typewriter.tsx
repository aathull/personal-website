"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

// Types `text` out one character at a time with a blinking cursor.
// An invisible copy of the full text reserves the space so nothing below jumps while typing.
// Screen readers get the full text straight away; reduced motion skips the effect.
export function Typewriter({
  text,
  speed = 75,
  startDelay = 300,
}: {
  text: string;
  speed?: number;
  startDelay?: number;
}) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          if (c + 1 >= text.length) clearInterval(interval);
          return Math.min(c + 1, text.length);
        });
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [reduce, text, speed, startDelay]);

  const shown = reduce ? text : text.slice(0, count);

  return (
    <span className="relative block">
      <span className="sr-only">{text}</span>
      <span aria-hidden className="invisible">
        {text}
      </span>
      <span aria-hidden className="absolute inset-0">
        {shown}
        {!reduce && (
          <span className="ml-1 inline-block h-[0.85em] w-[0.08em] translate-y-[0.1em] bg-accent animate-blink" />
        )}
      </span>
    </span>
  );
}
