import { cva } from "class-variance-authority";

/**
 * A stacked group of labeled option rows (rule 4a) — the checkbox group and radio group share the
 * column layout and the `density` axis verbatim, so both families alias this cva.
 */
export const optionGroupVariants = cva("flex flex-col", {
  variants: {
    density: {
      comfortable: "gap-2",
      compact: "gap-0",
    },
  },
});
