import { cva } from "class-variance-authority";

// The input field's orientation-aware root: label above (`vertical`) or beside (`horizontal`).
export const inputFieldRootVariants = cva("flex gap-2", {
  variants: {
    orientation: {
      vertical: "flex-col items-start",
      horizontal: "flex-row items-start",
    },
  },
});
