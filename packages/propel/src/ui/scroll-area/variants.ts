import { cva } from "class-variance-authority";

export const scrollAreaRootVariants = cva("relative flex min-h-0 flex-1 flex-col");
export const scrollAreaViewportVariants = cva(
  "min-h-0 flex-1 overscroll-contain rounded-[inherit] outline-none",
);
export const scrollAreaContentVariants = cva("min-w-full");
export const scrollAreaCornerVariants = cva("bg-transparent");
