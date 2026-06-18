import { cva, cx } from "class-variance-authority";

/** Root: a horizontal row of character slots (and optional separators). */
export const otpFieldRootVariants = cva("flex items-center gap-2");

/** Input: a single character cell with the input chrome tokens. */
export const otpFieldInputVariants = cva(
  cx(
    "size-9 rounded-md border-sm border-subtle bg-layer-2 text-center text-14 text-primary outline-none",
    "focus:border-accent-strong focus:ring-2 focus:ring-accent-strong/20",
    "data-disabled:cursor-not-allowed data-disabled:text-disabled",
  ),
);

/** Separator: a visual divider between groups of slots (e.g. `123-456`). */
export const otpFieldSeparatorVariants = cva("text-tertiary");
