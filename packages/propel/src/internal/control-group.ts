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
  "group/control flex transition-[color,background-color,border-color,box-shadow]",
  "hover:border-subtle-1 hover:bg-layer-2-hover",
  "focus-within:bg-layer-2 focus-within:hover:border-accent-strong focus-within:hover:bg-layer-2",
  "has-[:disabled]:cursor-not-allowed has-[:disabled]:border-subtle has-[:disabled]:bg-layer-2 has-[:disabled]:ring-0 has-[:disabled]:hover:border-subtle",
  "data-disabled:cursor-not-allowed data-disabled:border-subtle data-disabled:bg-layer-2 data-disabled:text-disabled data-disabled:ring-0 data-disabled:hover:border-subtle",
);

/**
 * THE single-line control magnitude scale — one meaning per step across every bordered form control
 * (input, autocomplete, combobox, select trigger, otp digit). Before this each family kept its own
 * scale and they disagreed: input was padding-based `md/lg/xl`, autocomplete/select ran `sm/md/lg`
 * at 28/32/36px but differed on the text size of the SAME step, the otp digits ran the same pixel
 * scale one label off (32/36/40 as "sm/md/lg"), and combobox had no axis at all. A step now always
 * means: height, text size, and glyph `--node-size`.
 *
 * Sm 28px / text-13 / 14px glyphs · md 32px / text-14 / 16px · lg 36px / text-14 / 16px · xl 44px /
 * text-16 / 20px. Families expose the steps their Figma spec defines and add only their own
 * geometry (padding, width, radius). Multiline (`text-area`) reuses the text sizes; the
 * number-field's scale stays coupled to its stepper `IconButton` squares.
 */
export const controlMagnitude = {
  sm: "min-h-7 text-13 [--node-size:0.875rem]",
  md: "min-h-8 text-14 [--node-size:1rem]",
  lg: "min-h-9 text-14 [--node-size:1rem]",
  xl: "min-h-11 text-16 [--node-size:1.25rem]",
} as const;

/** The visible label beside/above a bordered control — one type treatment for every picker. */
export const controlLabelClass = "text-14 font-medium text-primary";
