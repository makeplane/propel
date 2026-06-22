import { cva } from "class-variance-authority";

export const checkboxGroupVariants = cva("flex flex-col", {
  variants: {
    density: {
      comfortable: "gap-2",
      compact: "gap-0",
    },
  },
});
