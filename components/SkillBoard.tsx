"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowCounterClockwiseIcon, GameControllerIcon, XIcon } from "@phosphor-icons/react";
import { Breakout, formatTime, type Result } from "./Breakout";

type Phase = "idle" | "playing" | "over";

// Most pills are neutral; every fourth one gets the accent so it doesn't overwhelm the page.
const styles = [
  "bg-background text-foreground border border-line",
  "bg-foreground text-background",
  "bg-background text-foreground border border-line",
  "bg-accent text-on-accent",
];
const BEST_KEY = "breakout-best";

// Best time lives in this browser only. Storage can be blocked (private mode etc.), so it's best-effort.
function readBest() {
  try {
    const value = Number(localStorage.getItem(BEST_KEY));
    return value > 0 ? value : null;
  } catch {
    return null;
  }
}

function saveBest(time: number) {
  try {
    localStorage.setItem(BEST_KEY, String(time));
  } catch {}
}

// Small fixed tilts keep the sticker feel. Fixed values keep SSR and client in sync.
const tilts = [-4, 3, -2, 5, -3, 2, -5, 4];

// Shows the skills as a cloud of pills. "play breakout" swaps the board for a game of Breakout
// where the skills are the bricks.
export function SkillBoard({ skills }: { skills: string[] }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<Result | null>(null);
  // Best clear time, and whether the last game beat it. Only read once a game ends, so SSR never touches storage.
  const [best, setBest] = useState<{ time: number | null; isNew: boolean }>({ time: null, isNew: false });
  // Bumping the game remounts Breakout, which resets it.
  const [game, setGame] = useState(0);

  const play = () => {
    setResult(null);
    setGame((g) => g + 1);
    setPhase("playing");
  };

  return (
    <div>
      <div className="relative h-85 overflow-hidden rounded-2xl bg-surface md:h-100">
        {phase === "idle" ? (
          <motion.ul
            key="skills"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex h-full flex-wrap content-center justify-center gap-3 p-6 md:gap-4 md:p-10"
          >
            {skills.map((skill, i) => (
              <li
                key={skill}
                style={{ rotate: `${tilts[i % tilts.length]}deg` }}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium shadow-[0_6px_16px_-6px_rgb(24_24_27/0.3)] md:px-5 md:text-base ${styles[i % styles.length]}`}
              >
                {skill}
              </li>
            ))}
          </motion.ul>
        ) : (
          <motion.div
            key={game}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="size-full"
          >
            <Breakout
              skills={skills}
              onFinish={(r) => {
                const previous = readBest();
                const isNew = r.won && (previous === null || r.time < previous);
                if (isNew) saveBest(r.time);
                setBest({ time: isNew ? r.time : previous, isNew });
                setResult(r);
                setPhase("over");
              }}
              onQuit={() => setPhase("idle")}
            />
          </motion.div>
        )}

        {phase === "over" && result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 grid place-items-center bg-[rgb(20_16_8/0.45)] p-6 text-center backdrop-blur-sm"
          >
            <div>
              <p className="text-3xl font-semibold tracking-tight lowercase md:text-4xl">
                {result.won ? "every skill broken" : "out of lives"}
              </p>
              <p className="mt-2 font-mono text-muted tabular-nums">
                {result.won ? `in ${formatTime(result.time)}` : `${result.cleared}/${result.total} skills · ${formatTime(result.time)}`}
              </p>
              {best.isNew ? (
                <p className="mt-1 text-sm font-medium text-accent">new best time</p>
              ) : (
                best.time !== null && (
                  <p className="mt-1 font-mono text-sm text-muted tabular-nums">best {formatTime(best.time)}</p>
                )
              )}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={play}
                  autoFocus
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-on-accent transition-transform hover:-translate-y-0.5 active:translate-y-px"
                >
                  <ArrowCounterClockwiseIcon size={16} weight="bold" />
                  play again
                </button>
                <button
                  type="button"
                  onClick={() => setPhase("idle")}
                  className="rounded-full border border-line px-5 py-2.5 font-medium transition-colors hover:bg-surface active:translate-y-px"
                >
                  back to skills
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-3 flex h-8 items-center justify-between gap-3 text-sm text-muted">
        {phase === "idle" && (
          <>
            <p>fancy a game?</p>
            <button
              type="button"
              onClick={play}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 font-medium text-on-accent transition-transform hover:-translate-y-0.5 active:translate-y-px"
            >
              <GameControllerIcon size={16} weight="bold" />
              play breakout
            </button>
          </>
        )}
        {phase === "playing" && (
          <>
            <p className="truncate">
              break all the skills, fast<span className="hidden md:inline"> · mouse, touch or ← → · esc to quit</span>
            </p>
            <button
              type="button"
              onClick={() => setPhase("idle")}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 font-medium transition-colors hover:bg-surface hover:text-foreground active:scale-[0.98]"
            >
              <XIcon size={14} weight="bold" />
              quit
            </button>
          </>
        )}
        {phase === "over" && <p>good game</p>}
      </div>
    </div>
  );
}
