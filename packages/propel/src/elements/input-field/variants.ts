import { cva } from "class-variance-authority";

import { type StrictVariantProps } from "../../internal/variant-props";

// The input field's orientation-aware root: label above (`vertical`) or beside (`horizontal`).
export const inputFieldVariants = cva("flex gap-2", {
  variants: {
    orientation: {
      vertical: "flex-col items-start",
      horizontal: "flex-row items-start",
    },
  },
});

export type InputFieldVariantProps = StrictVariantProps<typeof inputFieldVariants>;
