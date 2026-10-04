"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";

type Status = "idle" | "copied" | "failed";

export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const t = setTimeout(() => setStatus("idle"), 2000);
    return () => clearTimeout(t);
  }, [status]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      // Clipboard can be blocked; fall back to opening the mail app.
      setStatus("failed");
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex max-w-full items-center gap-3 rounded-full border border-line px-5 py-3 text-lg font-medium transition-colors hover:border-accent active:scale-[0.98] md:px-7 md:py-4 md:text-2xl"
    >
      <span className="truncate">{email}</span>
      <span className="relative grid size-6 shrink-0 place-items-center text-muted group-hover:text-accent">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={status === "copied" ? "check" : "copy"}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.15 }}
          >
            {status === "copied" ? <CheckIcon size={22} weight="bold" className="text-accent" /> : <CopyIcon size={22} />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="sr-only" aria-live="polite">
        {status === "copied" ? "Email copied" : ""}
      </span>
    </button>
  );
}
