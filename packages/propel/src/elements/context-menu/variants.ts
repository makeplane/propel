import { cva, cx, type VariantProps } from "class-variance-authority";

import { itemIndicatorClass } from "../../internal/item-indicator";
import { menuSeparatorClass } from "../../internal/menu-row-parts";
import { nodeSlotClass } from "../../internal/node-slot";
import { popupSurfaceClass } from "../../internal/popup-surface";
import { type StrictVariantProps } from "../../internal/variant-props";

/** Popup: the menu surface, animated from its pointer-anchored transform origin. */
export const contextMenuPopupVariants = cva(cx(popupSurfaceClass, "min-w-40 p-1"));

/**
 * Item rows: shared styling for Item, LinkItem, CheckboxItem and RadioItem. `--node-size` sizes the
 * row's icon regions (leading icon, selection indicator) to the 16px row glyph. `h-8.5` (34px) and
 * the highlighted state leaving `text-secondary` untouched (bg tint only) both match the dropdown
 * `Menu`'s row exactly — the two surfaces share one row anatomy.
 */
export const contextMenuItemVariants = cva(
  cx(
    "flex h-8.5 cursor-default items-center gap-2 rounded-md px-2 text-13 outline-none select-none [--node-size:1rem]",
    "data-highlighted:bg-layer-transparent-hover",
    "data-disabled:pointer-events-none data-disabled:text-disabled",
  ),
  {
    variants: {
      /** Neutral rows use the standard text hierarchy; `danger` rows use the error palette. */
      tone: {
        neutral: "text-secondary",
        danger: "text-danger-primary data-disabled:text-disabled",
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
    "group/item flex h-8.5 cursor-default items-center gap-2 rounded-md px-2 text-13 outline-none select-none [--node-size:1rem]",
    "data-highlighted:bg-layer-transparent-hover",
    "data-popup-open:bg-layer-transparent-hover",
    "data-disabled:pointer-events-none data-disabled:text-disabled",
  ),
  {
    variants: {
      /** Neutral rows use the standard text hierarchy; `danger` rows use the error palette. */
      tone: {
        neutral: "text-secondary",
        danger: "text-danger-primary data-disabled:text-disabled",
      },
    },
  },
);

/** The growing label region of an item row; fills the row so trailing regions sit at the inline-end. */
export const contextMenuItemLabelVariants = cva("min-w-0 flex-1 truncate");

/**
 * Selection indicator region: the check inside checkbox/radio items and the trailing check of a
 * single-select `ContextMenuItem`. Sizes its single child to the row's `--node-size` and tints it
 * accent.
 */
export const contextMenuItemIndicatorVariants = cva(itemIndicatorClass);

/**
 * The tick region of a checkbox row. Kept mounted for a stable gutter; Base UI marks it
 * `data-unchecked` while off, which hides the glyph (its own contract — `itemIndicatorClass` keys
 * off `data-selected`, which checkbox/radio indicators never receive).
 */
export const contextMenuCheckboxItemIndicatorVariants = cva(
  cx(nodeSlotClass, "text-icon-accent-primary [--node-size:1rem] data-unchecked:invisible"),
);

/** The dot region of a radio row: a small filled circle, hidden while `data-unchecked`. */
export const contextMenuRadioItemIndicatorVariants = cva(
  cx(
    nodeSlotClass,
    "text-icon-accent-primary [--node-size:1rem] data-unchecked:invisible",
    "[&>svg]:size-2 [&>svg]:fill-current",
  ),
);

/** Separator: a thin divider spanning the popup padding. */
export const contextMenuSeparatorVariants = cva(menuSeparatorClass);

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
