import { cva } from "class-variance-authority";

// The `<fieldset>` element is the group's vertical stack: legend, optional description, then the
// body of contained fields, separated by a consistent gap. Per the design spec the legend sits at
// the top and the internal spacing is always the same; only the border visibility is adjustable.
export const fieldsetVariants = cva("flex min-w-0 flex-col gap-3", {
  variants: {
    /** Whether a visible border wraps the group. */
    bordered: {
      true: "rounded-md border-sm border-subtle p-4",
      false: "",
    },
  },
});

export const fieldsetLegendVariants = cva("font-medium text-primary", {
  variants: {
    magnitude: {
      md: "text-13",
      lg: "text-14",
      xl: "text-14",
    },
  },
});

/** Supporting text shown directly below the legend. */
export const fieldsetDescriptionVariants = cva("text-13 text-tertiary");

// The body region holding the group's contained fields. Per the design spec the vertical gap
// between child fields is always the same, so it is baked in here — callers no longer stack fields
// with an ad-hoc wrapper. `min-w-0` lets fields shrink instead of overflowing the group.
export const fieldsetBodyVariants = cva("flex min-w-0 flex-col gap-4");
