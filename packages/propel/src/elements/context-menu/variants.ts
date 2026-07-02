import { cva, cx, type VariantProps } from "class-variance-authority";

import { nodeSlotClass } from "../../internal/node-slot";
import { type StrictVariantProps } from "../../internal/variant-props";

/** Popup: the menu surface, animated from its pointer-anchored transform origin. */
export const contextMenuPopupVariants = cva(
  cx(
    "min-w-40 rounded-lg border-sm border-subtle bg-layer-1 p-1 shadow-overlay-100 outline-none",
    "origin-(--transform-origin) transition-[opacity,transform] duration-150",
    "data-starting-style:scale-95 data-starting-style:opacity-0",
    "data-ending-style:scale-95 data-ending-style:opacity-0",
  ),
);

/**
 * Item rows: shared styling for Item, LinkItem, CheckboxItem and RadioItem. `--node-size` sizes the
 * row's icon regions (leading icon, selection indicator) to the 16px row glyph.
 */
export const contextMenuItemVariants = cva(
  cx(
    "flex h-8 cursor-default items-center gap-2 rounded-md px-2 text-13 outline-none select-none [--node-size:1rem]",
    "data-highlighted:bg-layer-transparent-hover",
    "data-disabled:pointer-events-none data-disabled:text-disabled",
  ),
  {
    variants: {
      /** Neutral rows use the standard text hierarchy; `danger` rows use the error palette. */
      tone: {
        neutral: "text-secondary data-highlighted:text-primary",
        danger:
          "text-danger-primary data-disabled:text-disabled data-highlighted:text-danger-primary",
      },
    },
  },
);

/**
 * Submenu trigger row: extends item styles with the `group/item` marker and popup-open highlight.
 * `group/item` lets the trailing submenu caret react to the trigger's disabled state.
 */
export const contextMenuSubmenuTriggerVariants = cva(
  cx(
    "group/item flex h-8 cursor-default items-center gap-2 rounded-md px-2 text-13 outline-none select-none [--node-size:1rem]",
    "data-highlighted:bg-layer-transparent-hover",
    "data-popup-open:bg-layer-transparent-hover",
    "data-disabled:pointer-events-none data-disabled:text-disabled",
  ),
  {
    variants: {
      /** Neutral rows use the standard text hierarchy; `danger` rows use the error palette. */
      tone: {
        neutral: "text-secondary data-highlighted:text-primary data-popup-open:text-primary",
        danger:
          "text-danger-primary data-disabled:text-disabled data-highlighted:text-danger-primary data-popup-open:text-danger-primary",
      },
    },
  },
);

/** The leading icon region of an item row. Sizes its single child to the row's `--node-size`. */
export const contextMenuItemIconVariants = cva(nodeSlotClass);

/** The growing label region of an item row; fills the row so trailing regions sit at the inline-end. */
export const contextMenuItemLabelVariants = cva("min-w-0 flex-1 truncate");

/** The trailing keyboard-shortcut text region, sitting at the row's inline-end. */
export const contextMenuItemShortcutVariants = cva("shrink-0 text-12 text-tertiary");

/**
 * Selection indicator region: the check inside checkbox/radio items and the trailing check of a
 * single-select `ContextMenuItem`. Sizes its single child to the row's `--node-size` and tints it
 * accent.
 */
export const contextMenuItemIndicatorVariants = cva(cx(nodeSlotClass, "text-icon-accent-primary"));

/**
 * The submenu caret region at a submenu trigger's inline-end. Sizes its single child to the row's
 * `--node-size`, tints it tertiary (disabled when the trigger is disabled), and mirrors under RTL
 * so it always points toward the submenu.
 */
export const contextMenuSubmenuTriggerIndicatorVariants = cva(
  cx(
    nodeSlotClass,
    "text-icon-tertiary group-data-disabled/item:text-icon-disabled rtl:-scale-x-100",
  ),
);

/** Separator: a thin divider spanning the popup padding. */
export const contextMenuSeparatorVariants = cva("-mx-1 my-1 border-t border-subtle");

/** GroupLabel: a non-interactive section heading. */
export const contextMenuGroupLabelVariants = cva("px-2 py-1 text-12 font-medium text-tertiary");

type ContextMenuItemVariantConfig = VariantProps<typeof contextMenuItemVariants>;
/** Neutral rows use the standard text hierarchy; `danger` rows use the error palette. */
export type ContextMenuItemTone = NonNullable<ContextMenuItemVariantConfig["tone"]>;

export type ContextMenuItemVariantProps = StrictVariantProps<typeof contextMenuItemVariants>;

type ContextMenuSubmenuTriggerVariantConfig = VariantProps<
  typeof contextMenuSubmenuTriggerVariants
>;
/** Neutral rows use the standard text hierarchy; `danger` rows use the error palette. */
export type ContextMenuSubmenuTriggerTone = NonNullable<
  ContextMenuSubmenuTriggerVariantConfig["tone"]
>;

export type ContextMenuSubmenuTriggerVariantProps = StrictVariantProps<
  typeof contextMenuSubmenuTriggerVariants
>;
