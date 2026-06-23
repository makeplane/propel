import { cva, cx } from "class-variance-authority";

/** Positioner: anchors the popup at the pointer with overlay stacking. */
export const contextMenuPositionerVariants = cva("z-50 outline-none");

/** Popup: the menu surface, animated from its pointer-anchored transform origin. */
export const contextMenuPopupVariants = cva(
  cx(
    "min-w-40 rounded-lg border-sm border-subtle bg-layer-1 p-1 shadow-overlay-100 outline-none",
    "origin-(--transform-origin) transition-[opacity,transform] duration-150",
    "data-starting-style:scale-95 data-starting-style:opacity-0",
    "data-ending-style:scale-95 data-ending-style:opacity-0",
  ),
);

/** Item rows: shared styling for Item, LinkItem, CheckboxItem, RadioItem and SubmenuTrigger. */
export const contextMenuItemVariants = cva(
  cx(
    "flex h-8 cursor-default items-center gap-2 rounded-md px-2 text-13 outline-none select-none",
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

/** Submenu trigger row: extends item styles with the `group/item` marker and popup-open highlight. */
export const contextMenuSubmenuTriggerVariants = cva(
  cx(
    "group/item flex h-8 cursor-default items-center gap-2 rounded-md px-2 text-13 outline-none select-none",
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

/** Indicator slot inside radio/checkbox items. */
export const contextMenuItemIndicatorVariants = cva(
  "flex size-4 items-center justify-center text-icon-accent-primary",
);

/** Separator: a thin divider spanning the popup padding. */
export const contextMenuSeparatorVariants = cva("-mx-1 my-1 border-t border-subtle");

/** GroupLabel: a non-interactive section heading. */
export const contextMenuGroupLabelVariants = cva("px-2 py-1 text-12 font-medium text-tertiary");

/** Arrow: a small caret matching the popup surface color. */
export const contextMenuArrowVariants = cva("text-layer-1");
