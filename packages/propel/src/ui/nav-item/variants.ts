import { cva, cx, type VariantProps } from "class-variance-authority";

import { nodeSlotClass } from "../../internal/node-slot";
import { type StrictVariantProps } from "../../internal/variant-props";

// A nav row's chrome: fixed height, horizontal padding, icon-to-label gap, hover/active/
// selected surfaces and the focus ring are all "always the same" per the Figma spec. The
// adjustable axes (`magnitude` for label size, `level` for nesting indent) are cva variants.
export const navItemVariants = cva(
  cx(
    "group/nav-item flex h-8 w-full items-center gap-2 rounded-lg ps-2 pe-2 text-start [--node-size:1rem]",
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

// Decorative leading icon at the row's inline-start. Sizes its single child to the row's
// `--node-size` (shared node-slot class) and tints it to follow the row's state.
export const navItemIconVariants = cva(
  cx(
    nodeSlotClass,
    "text-icon-placeholder",
    "group-active/nav-item:text-icon-primary group-data-active/nav-item:text-icon-primary",
    "group-disabled/nav-item:text-icon-disabled group-aria-disabled/nav-item:text-icon-disabled",
  ),
);

// The row's growing label. `flex-1` fills the row so trailing content sits at the inline-end;
// `min-w-0` + `truncate` keep long labels on one line.
export const navItemLabelVariants = cva("min-w-0 flex-1 truncate leading-snug font-medium");

// Inline-end container for badges, counts, and a disclosure chevron.
export const navItemTrailingVariants = cva("flex shrink-0 items-center gap-2");

// The disclosure caret for an expandable row. Rotates a half-turn when the row is open;
// mirrored under RTL.
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

// Count chip inside a row's inline-end slot.
export const navItemCountVariants = cva(
  cx(
    "inline-flex min-w-4 items-center justify-center rounded-sm px-0.5",
    "bg-layer-3 text-11 leading-tight text-secondary",
  ),
);

// The collapsible content region beneath a `NavItemHeader`.
export const navItemPanelVariants = cva("flex flex-col gap-1");

// Section header wrapper: holds the toggle and its optional inline-end action in a row.
export const navItemHeaderVariants = cva(
  cx(
    "group/nav-item-header flex h-8 w-full items-center gap-1 rounded-lg ps-2 pe-1 text-start",
    "[--node-size:1rem]",
    "bg-layer-transparent text-tertiary transition-colors",
    "select-none hover:bg-layer-transparent-hover",
    "has-[>button:disabled]:hover:bg-transparent has-[>button[aria-disabled=true]]:hover:bg-transparent",
  ),
);

// The toggle button inside a `NavItemHeader`. Grows to fill the header so the action sits at
// the inline-end edge.
export const navItemHeaderToggleVariants = cva(
  cx(
    "group/nav-item-header-toggle flex min-w-0 flex-1 items-center gap-1 rounded-md py-2 text-start outline-none",
    "cursor-pointer text-inherit select-none",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
    "disabled:pointer-events-none disabled:text-disabled aria-disabled:pointer-events-none aria-disabled:text-disabled",
  ),
);

// Section title label inside the header toggle.
export const navItemHeaderLabelVariants = cva("min-w-0 truncate text-body-xs-semibold");

// The disclosure caret inside the header toggle. Points toward the inline-end when collapsed
// and rotates to point down when the section's panel opens (Base UI sets `data-panel-open` on
// the toggle, which carries the `group` class). Mirrored under RTL.
export const navItemHeaderIndicatorVariants = cva(
  cx(
    "flex size-4 shrink-0 items-center justify-center text-icon-secondary [&>svg]:size-full",
    "rotate-90 transition-transform group-data-panel-open/nav-item-header-toggle:rotate-0",
    "rtl:-rotate-90 rtl:group-data-panel-open/nav-item-header-toggle:rotate-0",
  ),
);

// Inline-end action slot inside the header (a sibling of the toggle, not nested inside it).
export const navItemHeaderActionVariants = cva(cx(nodeSlotClass, "text-icon-secondary"));

export type NavItemMagnitude = NonNullable<VariantProps<typeof navItemVariants>["magnitude"]>;

export type NavItemLevel = NonNullable<VariantProps<typeof navItemVariants>["level"]>;

export type NavItemVariantProps = StrictVariantProps<typeof navItemVariants>;
