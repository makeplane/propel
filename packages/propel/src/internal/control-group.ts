import { cx } from "class-variance-authority";

import { fieldControlSurfaceVariants } from "./field-control-surface";

/**
 * The shared interaction chrome for a bordered group that WRAPS a separately-focusable form control
 * — the input, textarea, autocomplete, combobox (input row and chips frame), and number-field
 * frames. Composes the `focus: "within"` control surface and adds the one interaction design every
 * input box shares (before this, input/text-area carried it and the pickers had silently drifted to
 * a static frame):
 *
 * - A color/border/shadow transition,
 * - The rest hover (`border-subtle-1` + `layer-2-hover` fill),
 * - The focused-hover correction (keep the accent border and flat fill while typing),
 * - The disabled guard in BOTH selector forms — `:has(:disabled)` for a frame around a native control
 *   and `data-disabled` for a Base UI group that mirrors state as an attribute.
 *
 * Families add only their own geometry: width, alignment, gap, radius, padding/magnitude.
 */
export const controlGroupClass = cx(
  fieldControlSurfaceVariants({ focus: "within" }),
  "flex transition-[color,background-color,border-color,box-shadow]",
  "hover:border-subtle-1 hover:bg-layer-2-hover",
  "focus-within:bg-layer-2 focus-within:hover:border-accent-strong focus-within:hover:bg-layer-2",
  "has-[:disabled]:cursor-not-allowed has-[:disabled]:border-subtle has-[:disabled]:bg-layer-2 has-[:disabled]:ring-0 has-[:disabled]:hover:border-subtle",
  "data-disabled:cursor-not-allowed data-disabled:border-subtle data-disabled:bg-layer-2 data-disabled:text-disabled data-disabled:ring-0 data-disabled:hover:border-subtle",
);
