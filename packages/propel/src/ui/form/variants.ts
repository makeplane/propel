import { cva } from "class-variance-authority";

export const formVariants = cva("flex gap-4", {
  variants: {
    /**
     * Controls the field arrangement axis. - `"single"` — one column, fields stack vertically (the
     * default vertical rhythm baked by the spec). - `"multi"` — wrapping flex row, suitable for
     * side-by-side field pairs.
     */
    layout: {
      single: "flex-col",
      multi: "flex-row flex-wrap",
    },
  },
});
