/**
 * The motion system.
 *
 * Every animated value on the site resolves to something in this file or to a
 * `--ac-dur-*` / `--ac-ease-*` token. Before it existed there were eleven
 * different stagger formulas and three spring configs, which is why the site
 * felt arbitrary in motion rather than composed.
 *
 * The rules:
 *   - Entrances ease out. Things arriving decelerate; they never bounce in.
 *   - Hovers respond fast and relax slow (see `--ac-dur-fast` in, `-base` out).
 *     Matching both directions makes a control feel sticky.
 *   - Nothing that is already on screen moves position on hover. Light, ink and
 *     color change instead — the same idea the buttons are built on.
 *   - One stagger step, capped, so a long list never crawls.
 */

/** Deceleration curve. The site's default for anything arriving. */
export const EASE_OUT = [0.22, 0.61, 0.36, 1] as const;

/** For things leaving — quicker off the mark than they arrive. */
export const EASE_IN = [0.55, 0, 0.85, 0.35] as const;

/** Seconds, mirroring the `--ac-dur-*` tokens so CSS and JS agree. */
export const DUR = {
  instant: 0.09,
  fast: 0.18,
  base: 0.26,
  flood: 0.42,
  reveal: 0.62,
} as const;

/** Layout changes that move something a long way — the header collapse. */
export const springLayout = {
  type: "spring",
  stiffness: 320,
  damping: 34,
  mass: 0.9,
} as const;

/** Small indicators travelling a short distance — nav rule, category pill. */
export const springIndicator = {
  type: "spring",
  stiffness: 420,
  damping: 36,
} as const;

/** Deliberate overshoot — reserved for a success moment, never for navigation. */
export const springPop = {
  type: "spring",
  stiffness: 320,
  damping: 18,
} as const;

const STEP = 0.07;
const CAP = 0.28;

/**
 * The one stagger rule.
 *
 * `index` is position within a group; `lead` offsets a whole group (used when
 * content should follow its own heading rather than race it). Capped at CAP so
 * a six-item gallery doesn't take half a second to finish arriving.
 */
export function stagger(index: number, lead = 0): number {
  return lead + Math.min(index * STEP, CAP);
}

/** Content that trails the heading above it. */
export const LEAD_AFTER_HEADING = 0.08;
