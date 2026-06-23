import { cva, cx } from "class-variance-authority";

import { nodeSlotClass } from "../../internal/node-slot";

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

/** Icon slot at the inline-start of a nav row. */
export const navItemIconClass = cx(
  "flex size-4 shrink-0 items-center justify-center text-icon-placeholder [&>svg]:size-full",
  "group-active/nav-item:text-icon-primary group-data-active/nav-item:text-icon-primary",
  "group-disabled/nav-item:text-icon-disabled group-aria-disabled/nav-item:text-icon-disabled",
);

/** Truncating label inside a nav row. */
export const navItemLabelClass = "min-w-0 flex-1 truncate leading-snug font-medium";

/** Inline-end container for badges, counts, and chevrons. */
export const navItemTrailingClass = "flex shrink-0 items-center gap-2";

export const navItemChevronVariants = cva(
  cx(
    "flex size-4 shrink-0 items-center justify-center text-icon-placeholder [&>svg]:size-full",
    "transition-transform rtl:-scale-x-100",
  ),
  {
    variants: {
      open: {
        true: "rotate-180",
        false: "",
      },
    },
  },
);

/** Count chip inside a nav row's inline-end slot. */
export const navItemCountClass = cx(
  "inline-flex min-w-4 items-center justify-center rounded-sm px-0.5",
  "bg-layer-3 text-11 leading-tight text-secondary",
);

export const navItemHeaderVariants = cva(
  cx(
    "group/nav-item-header flex h-8 w-full items-center gap-1 rounded-lg ps-2 pe-1 text-start",
    "[--node-size:1rem]",
    "bg-layer-transparent text-tertiary transition-colors",
    "select-none hover:bg-layer-transparent-hover",
    "has-[>button:disabled]:hover:bg-transparent has-[>button[aria-disabled=true]]:hover:bg-transparent",
  ),
);

/** Toggle button inside a `NavItemHeader` wrapper. */
export const navItemHeaderToggleClass = cx(
  "group/nav-item-header-toggle flex min-w-0 flex-1 items-center gap-1 rounded-md py-2 text-start outline-none",
  "cursor-pointer text-inherit select-none",
  "focus-visible:ring-2 focus-visible:ring-accent-strong",
  "disabled:pointer-events-none disabled:text-disabled aria-disabled:pointer-events-none aria-disabled:text-disabled",
);

/** Chevron slot inside the `NavItemHeader` toggle. */
export const navItemHeaderChevronClass = cx(
  "flex size-4 shrink-0 items-center justify-center text-icon-secondary [&>svg]:size-full",
  "rotate-90 transition-transform group-data-panel-open/nav-item-header-toggle:rotate-0",
  "rtl:-rotate-90 rtl:group-data-panel-open/nav-item-header-toggle:rotate-0",
);

/** Inline-end action slot inside `NavItemHeader`. */
export const navItemHeaderActionClass = cx(nodeSlotClass, "text-icon-secondary");

/** Section title label inside `NavItemHeader`. */
export const navItemHeaderLabelClass = "min-w-0 truncate text-body-xs-semibold";
