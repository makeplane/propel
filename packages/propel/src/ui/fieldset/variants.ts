import { cva } from "class-variance-authority";

export const fieldsetVariants = cva("flex min-w-0 flex-col gap-3");

export const fieldsetLegendVariants = cva("font-medium text-primary", {
  variants: {
    magnitude: {
      md: "text-13",
      lg: "text-14",
      xl: "text-14",
    },
  },
});
