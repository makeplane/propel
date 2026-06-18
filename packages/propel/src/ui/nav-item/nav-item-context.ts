import { cx } from "class-variance-authority";

export const navItemHeaderToggleClass = cx(
  "flex min-w-0 flex-1 items-center gap-1 rounded-md py-2 text-start outline-none",
  "cursor-pointer text-inherit select-none",
  "focus-visible:ring-2 focus-visible:ring-accent-strong",
  "disabled:pointer-events-none disabled:text-disabled aria-disabled:pointer-events-none aria-disabled:text-disabled",
);
