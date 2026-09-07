"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import shop from "@/content/shop";

export default function DispatchForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const reduceMotion = useReducedMotion();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = email.trim();

    if (!value) return setError("An email address, and we’ll do the rest.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value))
      return setError(
        value.includes("@")
          ? "That’s missing a domain — something like name@example.com."
          : "That’s missing an @."
      );

    setError(null);
    setDone(true);
  };

  return (
    <div className="rounded-md border border-hairline-dark bg-white/5 p-8 sm:p-10">
      <h2 className="text-2xl text-paper">{shop.dispatch.title}</h2>
      <p className="mt-3 max-w-measure text-sm leading-relaxed text-on-dark-muted">
        {shop.dispatch.body}
      </p>

      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.p
            key="done"
            role="status"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            className="mt-7 flex items-start gap-3 text-sm text-paper"
          >
            <span aria-hidden className="mt-0.5 text-ember">✓</span>
            <span>
              You’re on the list — the next dispatch goes out when the shelf changes.
              <span className="mt-1 block text-on-dark-muted">
                Demonstration only: nothing was stored or sent.
              </span>
            </span>
          </motion.p>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            exit={{ opacity: 0 }}
            className="mt-7"
          >
            <label htmlFor="dispatch-email" className="mb-2 block text-sm font-600 text-paper">
              Email address
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="dispatch-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "dispatch-error" : undefined}
                className={`min-h-[3rem] flex-1 rounded-sm border bg-white/8 px-3.5 text-base text-paper transition-colors duration-[var(--ac-dur-fast)] placeholder:text-white/40
                  ${error ? "border-ember" : "border-hairline-dark hover:border-white/35 focus:border-ember"}`}
              />
              <button
                type="submit"
                className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-sm bg-paper px-6 text-sm font-600 text-espresso transition-[background-color,transform] duration-[var(--ac-dur-fast)] ease-out hover:-translate-y-0.5 hover:bg-white active:translate-y-0"
              >
                Sign up
              </button>
            </div>
            <AnimatePresence>
              {error && (
                <motion.p
                  id="dispatch-error"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden text-sm text-ember"
                >
                  <span className="mt-2 block">{error}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
