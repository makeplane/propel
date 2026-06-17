import { cva, cx } from "class-variance-authority";

export const navItemVariants = cva(
  cx(
    "group/nav-item flex h-8 w-full items-center gap-2 rounded-lg ps-2 pe-2 text-start",
    "bg-layer-transparent text-secondary transition-colors outline-none",
    "cursor-pointer select-none",
    "hover:bg-layer-transparent-hover active:bg-layer-transparent-active active:text-primary",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
    "data-active:bg-layer-transparent-selected data-active:text-primary",
    "disabled:pointer-events-none disabled:text-disabled aria-disabled:pointer-events-none aria-disabled:text-disabled",
  ),
  {
    variants: {
      magnitude: {
        lg: "text-14",
        md: "text-13",
      },
      level: {
        1: "",
        2: "ps-4",
        3: "ps-6",
        4: "ps-8",
        5: "ps-10",
      },
    },
  },
);

export const navItemHeaderVariants = cva(
  cx(
    "group/nav-item-header flex h-8 w-full items-center gap-1 rounded-lg ps-2 pe-1 text-start",
    "bg-layer-transparent text-tertiary transition-colors",
    "select-none hover:bg-layer-transparent-hover",
    "has-[>button:disabled]:hover:bg-transparent has-[>button[aria-disabled=true]]:hover:bg-transparent",
  ),
);

export const navItemHeaderToggleClass = cx(
  "flex min-w-0 flex-1 items-center gap-1 rounded-md py-2 text-start outline-none",
  "cursor-pointer text-inherit select-none",
  "focus-visible:ring-2 focus-visible:ring-accent-strong",
  "disabled:pointer-events-none disabled:text-disabled aria-disabled:pointer-events-none aria-disabled:text-disabled",
);
