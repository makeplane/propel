import { cva } from "class-variance-authority";

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
