"use client";

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type FieldName = "name" | "email" | "message";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const EMPTY: Values = { name: "", email: "", message: "" };

/**
 * Messages say what is actually wrong and how to fix it. "Invalid input" tells
 * someone they failed without telling them at what.
 */
function validate(values: Values): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) errors.name = "Please tell us your name.";
  else if (values.name.trim().length < 2) errors.name = "That looks a little short for a name.";

  if (!values.email.trim()) errors.email = "We need an email address to write back to.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = values.email.includes("@")
      ? "That address is missing a domain — something like name@example.com."
      : "That address is missing an @.";

  if (!values.message.trim()) errors.message = "Let us know what you’d like to ask.";
  else if (values.message.trim().length < 10)
    errors.message = "A sentence or two would help us answer properly.";

  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const reduceMotion = useReducedMotion();

  const setField = (field: FieldName, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    /* Once a field has been flagged, re-check as they type so the error clears
       the moment it’s fixed rather than waiting for another blur. */
    if (touched[field]) setErrors(validate(next));
  };

  const blurField = (field: FieldName) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, message: true });

    const firstInvalid = (["name", "email", "message"] as FieldName[]).find((f) => found[f]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    // A demo site. Validates properly, sends nothing.
    setSent(true);
  };

  const fieldClass = (field: FieldName) =>
    `w-full rounded-sm border bg-surface px-3.5 py-3 text-base text-espresso transition-[border-color,box-shadow] duration-[var(--ac-dur-fast)]
     placeholder:text-stone/70
     ${
       errors[field] && touched[field]
         ? "border-ember"
         : "border-hairline-strong hover:border-stone focus:border-ember"
     }`;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {sent ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 0.61, 0.36, 1] }}
          className="rounded-md border border-hairline bg-surface p-8"
          role="status"
        >
          <motion.svg
            viewBox="0 0 44 44"
            aria-hidden
            className="h-11 w-11 text-ember"
            initial={reduceMotion ? false : { scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.08, type: "spring", stiffness: 320, damping: 18 }}
          >
            <circle cx="22" cy="22" r="20" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
            <motion.path
              d="M13 22.5l6 6 12-13"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduceMotion ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.18, duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
            />
          </motion.svg>
          <h3 className="mt-5 text-2xl text-espresso">Thanks — that’s with us.</h3>
          <p className="mt-3 max-w-measure text-sm leading-relaxed text-muted">
            We read everything and usually reply within a day or two. In the meantime, the
            coffee is still here.
          </p>
          <p className="mt-4 rounded-sm bg-sunken px-3 py-2 text-xs text-muted">
            This is a demonstration site — the form validates, but nothing was actually sent.
          </p>
          <button
            type="button"
            onClick={() => {
              setSent(false);
              setValues(EMPTY);
              setErrors({});
              setTouched({});
            }}
            className="mt-6 inline-flex min-h-11 items-center text-sm font-600 text-ember transition-colors hover:text-amber"
          >
            Write another
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          onSubmit={onSubmit}
          noValidate
          initial={false}
          exit={{ opacity: 0 }}
          className="flex flex-col gap-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              {/* A real label, above the field, that doesn’t vanish on typing */}
              <label htmlFor="name" className="mb-2 block text-sm font-600 text-espresso">
                Your name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={(e) => setField("name", e.target.value)}
                onBlur={() => blurField("name")}
                aria-invalid={Boolean(errors.name && touched.name)}
                aria-describedby={errors.name && touched.name ? "name-error" : undefined}
                className={fieldClass("name")}
              />
              <FieldError id="name-error" message={touched.name ? errors.name : undefined} />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-600 text-espresso">
                Email address
              </label>
              {/* type="email" so phones bring up the right keyboard */}
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => setField("email", e.target.value)}
                onBlur={() => blurField("email")}
                aria-invalid={Boolean(errors.email && touched.email)}
                aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                className={fieldClass("email")}
              />
              <FieldError id="email-error" message={touched.email ? errors.email : undefined} />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-600 text-espresso">
              What would you like to ask?
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={values.message}
              onChange={(e) => setField("message", e.target.value)}
              onBlur={() => blurField("message")}
              aria-invalid={Boolean(errors.message && touched.message)}
              aria-describedby={errors.message && touched.message ? "message-error" : undefined}
              className={`${fieldClass("message")} resize-y`}
            />
            <FieldError id="message-error" message={touched.message ? errors.message : undefined} />
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <button
              type="submit"
              className="inline-flex min-h-[3rem] items-center gap-2 rounded-sm bg-ember px-6 text-sm font-600 text-cream shadow-sm transition-[background-color,transform,box-shadow] duration-[var(--ac-dur-fast)] ease-out hover:-translate-y-0.5 hover:bg-amber hover:shadow-md active:translate-y-0"
            >
              Send it
            </button>
            <p className="text-xs text-muted">
              A demonstration form — it validates, but sends nothing.
            </p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          id={id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
          className="overflow-hidden text-sm text-ember"
        >
          <span className="mt-2 block">{message}</span>
        </motion.p>
      )}
    </AnimatePresence>
  );
}
