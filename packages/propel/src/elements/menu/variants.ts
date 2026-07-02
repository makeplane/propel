import { cva, cx } from "class-variance-authority";

import { checkboxBoxVariants } from "../../internal/checkbox-box";
import { itemIndicatorClass } from "../../internal/item-indicator";
import { groupLabelClass } from "../../internal/listbox-group-label";
import { menuSeparatorClass, rowMetaClass } from "../../internal/menu-row-parts";
import { nodeSlotClass } from "../../internal/node-slot";
import { popupSurfaceClass } from "../../internal/popup-surface";
import { type StrictVariantProps } from "../../internal/variant-props";

/**
 * Popup: the menu surface.
 *
 * - `surface="raised"` is the standalone surface — its own elevation, radius, border and animated
 *   transform origin (used when the popup is the menu's outer chrome, e.g. the elements-tier
 *   story).
 * - `surface="inset"` is the padded list that sits _inside_ an `OverlayPanel` (the components-tier
 *   `MenuContent` provides the elevated, scrollable shell), so the popup only contributes padding.
 */
export const menuPopupVariants = cva("outline-none", {
  variants: {
    elevation: {
      raised: cx(popupSurfaceClass, "min-w-40 p-1"),
      flat: "p-1",
    },
  },
});

// All interactive rows (item, link, radio, checkbox, submenu trigger) share one row base:
// the same height, padding, radius, gap, text + disabled treatment. `variant` switches between
// a single-line row and a taller top-aligned row that fits a description; `emphasis` switches
// the hover/cursor affordance.
const menuRowBase = cx(
  "group/item flex w-full gap-2 rounded-md px-2 text-13 outline-none select-none [--node-size:1rem]",
  "text-secondary",
  "data-disabled:pointer-events-none data-disabled:text-disabled",
);

/** Standalone `MenuItem` row: `layout` (single vs with-description) + `emphasis`. */
export const menuRowVariants = cva(cx(menuRowBase, "data-highlighted:bg-layer-transparent-hover"), {
  variants: {
    layout: {
      default: "h-[34px] items-center",
      "with-description": "min-h-[34px] items-start py-1.5",
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
export const menuSubmenuTriggerVariants = cva(
  cx(
    menuRowBase,
    "h-[34px] cursor-default items-center",
    "data-highlighted:bg-layer-transparent-hover data-popup-open:bg-layer-transparent-hover",
  ),
);

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
export const menuItemMetaVariants = cva(rowMetaClass);

/** A trailing slot for arbitrary content. Sizes an icon child to `--node-size`; adds no tint. */
export const menuItemTrailingVariants = cva(nodeSlotClass);

/**
 * The single-select check shown at a row's inline-end. Sizes its single child to `--node-size` and
 * tints it with the accent. Decorative — the row carries the selected state.
 */
export const menuItemIndicatorVariants = cva(cx(itemIndicatorClass, "h-5 w-4"));

/** The leading control slot of a checkbox/radio row, holding the visual toggle. */
export const menuItemControlVariants = cva("flex shrink-0 items-center");

/** Indicator slot inside a radio item: the accent dot shown when the row is selected. */
export const menuRadioItemIndicatorVariants = cva(
  "flex size-4 items-center justify-center text-icon-accent-primary",
);

/**
 * CheckboxItem indicator: the leading checkbox BOX. Composes the shared `checkboxBoxVariants` (the
 * 16px bordered square that fills the accent on `data-checked`) with the node-slot that sizes its
 * inner glyph. Kept mounted by `MenuCheckboxItemIndicator`, so the empty box shows when unchecked;
 * the glyph stays hidden until the box is checked (`data-unchecked:[&>*]:invisible`).
 */
export const menuCheckboxItemIndicatorVariants = cva(
  cx(checkboxBoxVariants(), nodeSlotClass, "data-unchecked:[&>*]:invisible"),
);

/** Separator: a thin divider spanning the popup padding. */
export const menuSeparatorVariants = cva(menuSeparatorClass);

/** GroupLabel: a non-interactive section heading. */
export const menuGroupLabelVariants = cva(groupLabelClass);

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

/** Search input: the borderless text field in `MenuSearch`. */
export const menuSearchInputVariants = cva(
  "min-w-0 flex-1 bg-transparent text-13 text-secondary outline-none placeholder:text-placeholder",
);

/** Footer: a non-interactive footer pinned below the popup list. */
export const menuFooterVariants = cva(
  "shrink-0 border-t border-subtle bg-layer-2 px-3 py-2 text-12 text-tertiary",
);

export type MenuPopupVariantProps = StrictVariantProps<typeof menuPopupVariants>;

export type MenuRowVariantProps = StrictVariantProps<typeof menuRowVariants>;
