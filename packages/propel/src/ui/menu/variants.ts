import { cva, cx } from "class-variance-authority";

import { nodeSlotClass } from "../../internal/node-slot";

/** Positioner: anchors the popup at the pointer with overlay stacking. */
export const menuPositionerVariants = cva("z-50 outline-none");

/**
 * Popup: the menu surface.
 *
 * - `surface="raised"` is the standalone surface — its own elevation, radius, border and animated
 *   transform origin (used when the popup is the menu's outer chrome, e.g. the UI-tier story).
 * - `surface="inset"` is the padded list that sits _inside_ an `OverlayPanel` (the components-tier
 *   `MenuContent` provides the elevated, scrollable shell), so the popup only contributes padding.
 */
export const menuPopupVariants = cva("outline-none", {
  variants: {
    surface: {
      raised: cx(
        "min-w-40 rounded-lg border-sm border-subtle bg-layer-1 p-1 shadow-overlay-100",
        "origin-(--transform-origin) transition-[opacity,transform] duration-150",
        "data-starting-style:scale-95 data-starting-style:opacity-0",
        "data-ending-style:scale-95 data-ending-style:opacity-0",
      ),
      inset: "p-1",
    },
  },
});

/** Viewport: content wrapper that morphs/clips during submenu transitions. */
export const menuViewportVariants = cva("relative");

// All interactive rows (item, link, radio, checkbox, submenu trigger) share one row base:
// the same height, padding, radius, gap, text + disabled treatment. `variant` switches between
// a single-line row and a taller top-aligned row that fits a description; `emphasis` switches
// the hover/cursor affordance.
const menuRowBase = cx(
  "group/item flex w-full gap-2 rounded-md px-2 text-13 outline-none select-none [--node-size:1rem]",
  "text-secondary",
  "data-disabled:pointer-events-none data-disabled:text-disabled",
);

/** Standalone `MenuItem` row: variant-driven layout + emphasis. */
export const menuRowVariants = cva(menuRowBase, {
  variants: {
    variant: {
      default: "h-[34px] items-center",
      "with-description": "min-h-[34px] items-start py-1.5",
    },
    emphasis: {
      default: "cursor-default data-highlighted:bg-layer-transparent-hover",
      link: "cursor-pointer data-highlighted:bg-layer-transparent-hover",
    },
  },
});

/**
 * CheckboxItem row: the shared row base, fixed to the single-line/default-emphasis pairing (a
 * checkbox row never carries a description).
 */
export const menuCheckboxItemVariants = cva(
  cx(
    menuRowBase,
    "h-[34px] cursor-default items-center data-highlighted:bg-layer-transparent-hover",
  ),
);

/**
 * SubmenuTrigger row: the shared row base; also highlights while its submenu popup is open
 * (`data-popup-open`).
 */
export const menuSubTriggerVariants = cva(
  cx(
    menuRowBase,
    "h-[34px] cursor-default items-center",
    "data-highlighted:bg-layer-transparent-hover data-popup-open:bg-layer-transparent-hover",
  ),
);

/** Leading icon slot inside a row: sizes its single child to the row's `--node-size` and tints it. */
export const menuItemIconVariants = cva(cx(nodeSlotClass, "text-icon-secondary"));

/**
 * The text column of a row. Grows to fill the row (so trailing nodes/indicators sit at the
 * inline-end), stacks the title row over an optional description, and clips overflow.
 */
export const menuItemContentVariants = cva("flex min-w-0 flex-1 flex-col");

/** The baseline-aligned row holding the title and any inline secondary text. */
export const menuItemTitleRowVariants = cva("flex min-w-0 items-baseline gap-1.5");

/** The row's primary label. Truncates rather than wrapping. */
export const menuItemTitleVariants = cva("truncate");

/** Muted text shown inline after the title (e.g. a translation, a hint). */
export const menuItemSecondaryTextVariants = cva(
  "shrink-0 truncate text-12 text-tertiary group-data-disabled/item:text-disabled",
);

/** A muted second line beneath the title (the item description). */
export const menuItemDescriptionVariants = cva(
  "truncate text-12 text-tertiary group-data-disabled/item:text-disabled",
);

/** Trailing muted metadata shown after the title column (e.g. a keyboard shortcut). */
export const menuItemMetaVariants = cva("shrink-0 text-12 text-tertiary");

/** A trailing slot for arbitrary content. Sizes an icon child to `--node-size`; adds no tint. */
export const menuItemTrailingVariants = cva(nodeSlotClass);

/**
 * The single-select check shown at a row's inline-end. Sizes its single child to `--node-size` and
 * tints it with the accent. Decorative — the row carries the selected state.
 */
export const menuItemSelectedIndicatorVariants = cva(
  cx(nodeSlotClass, "h-5 w-4 text-icon-accent-primary"),
);

/**
 * The chevron that marks a submenu trigger, pinned at the row's inline-end. Sizes its single child
 * to `--node-size`, tints it, and mirrors under RTL. Decorative; defaults to a chevron glyph.
 */
export const menuItemSubmenuIndicatorVariants = cva(
  cx(
    nodeSlotClass,
    "text-icon-tertiary group-data-disabled/item:text-icon-disabled rtl:-scale-x-100",
  ),
);

/** The leading control slot of a checkbox/radio row, holding the visual toggle. */
export const menuItemControlVariants = cva("flex shrink-0 items-center");

/** Indicator slot inside radio/checkbox items. */
export const menuItemIndicatorVariants = cva(
  "flex size-4 items-center justify-center text-icon-accent-primary",
);

/** Separator: a thin divider spanning the popup padding. */
export const menuSeparatorVariants = cva("-mx-1 my-1 border-t border-subtle");

/** GroupLabel: a non-interactive section heading. */
export const menuGroupLabelVariants = cva("px-2 py-1 text-12 font-medium text-tertiary");

/**
 * Label: a non-interactive section heading row that can carry inline-end metadata. Lays out a
 * growing `MenuLabelTitle` and an optional `MenuLabelMeta`.
 */
export const menuLabelVariants = cva("flex items-center gap-1.5 px-2 py-1.5 text-12 text-tertiary");

/** The growing title within a `MenuLabel`. */
export const menuLabelTitleVariants = cva("min-w-0 flex-1 truncate");

/** Trailing metadata pinned at the inline-end of a `MenuLabel`. */
export const menuLabelMetaVariants = cva("shrink-0");

/** Search: the sticky search row pinned above the popup list. */
export const menuSearchVariants = cva(
  "flex shrink-0 items-center gap-1.5 border-b border-subtle bg-surface-1 px-3 py-2",
);

/** Search icon: the leading magnifier glyph in `MenuSearch`. Sizes its child to `--node-size`. */
export const menuSearchIconVariants = cva(
  cx(nodeSlotClass, "text-icon-tertiary [--node-size:1rem]"),
);

/** Search input: the borderless text field in `MenuSearch`. */
export const menuSearchInputVariants = cva(
  "min-w-0 flex-1 bg-transparent text-13 text-secondary outline-none placeholder:text-placeholder",
);

/** Footer: a non-interactive footer pinned below the popup list. */
export const menuFooterVariants = cva(
  "shrink-0 border-t border-subtle bg-layer-2 px-3 py-2 text-12 text-tertiary",
);

/** Arrow: a small caret matching the popup surface color. */
export const menuArrowVariants = cva("text-layer-1");
