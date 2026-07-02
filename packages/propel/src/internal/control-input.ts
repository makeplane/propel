import { cx } from "class-variance-authority";

/**
 * The shared text treatment for the bare control INSIDE a bordered group — the input, textarea,
 * autocomplete/combobox inputs, and the number-field's numeric input. Before this each family
 * re-spelled it (and drifted: only the plain input had the accent caret). The control is
 * transparent (the group owns the surface), primary text over placeholder color, no outline (the
 * group draws focus), and disabled shows the not-allowed cursor + disabled text.
 *
 * Families add their own geometry/typography: `flex-1`/fixed width, text size per magnitude,
 * alignment, and overflow behavior.
 */
export const controlInputClass = cx(
  "min-w-0 bg-transparent text-primary outline-none",
  "caret-(--border-color-accent-strong)",
  "placeholder:text-placeholder",
  "disabled:cursor-not-allowed disabled:text-disabled",
);
