import { cva, cx } from "class-variance-authority";

/** Positioner: anchors the popup at the pointer with overlay stacking. */
export const menuPositionerVariants = cva("z-50 outline-none");

/** Popup: the menu surface, animated from its pointer-anchored transform origin. */
export const menuPopupVariants = cva(
  cx(
    "min-w-40 rounded-lg border-sm border-subtle bg-layer-1 p-1 shadow-overlay-100 outline-none",
    "origin-(--transform-origin) transition-[opacity,transform] duration-150",
    "data-starting-style:scale-95 data-starting-style:opacity-0",
    "data-ending-style:scale-95 data-ending-style:opacity-0",
  ),
);

/** Viewport: content wrapper that morphs/clips during submenu transitions. */
export const menuViewportVariants = cva("relative");

/** Standalone `MenuItem` row: variant-driven layout + emphasis, distinct from the shared row base. */
export const menuRowVariants = cva(
  cx(
    "group/item flex w-full gap-2 rounded-md px-2 text-13 outline-none select-none [--node-size:1rem]",
    "text-secondary",
    "data-disabled:pointer-events-none data-disabled:text-disabled",
  ),
  {
    variants: {
      variant: {
        default: "h-[34px] items-center",
        "with-description": "min-h-[34px] items-start py-1.5",
      },
      emphasis: {
        default: "cursor-default data-highlighted:bg-layer-transparent-hover",
        link: "cursor-pointer",
      },
    },
  },
);

/**
 * CheckboxItem row: same base as `menuRowVariants` at `variant="default"` / `emphasis="default"`,
 * kept separate so the checkbox part is its own named variant.
 */
export const menuCheckboxItemVariants = cva(
  cx(
    "group/item flex h-[34px] w-full cursor-default items-center gap-2 rounded-md px-2 text-13 outline-none select-none [--node-size:1rem]",
    "text-secondary",
    "data-highlighted:bg-layer-transparent-hover",
    "data-disabled:pointer-events-none data-disabled:text-disabled",
  ),
);

/**
 * SubmenuTrigger row: same base but also highlights when the submenu popup is open
 * (`data-popup-open`).
 */
export const menuSubTriggerVariants = cva(
  cx(
    "group/item flex h-[34px] w-full cursor-default items-center gap-2 rounded-md px-2 text-13 outline-none select-none [--node-size:1rem]",
    "text-secondary",
    "data-highlighted:bg-layer-transparent-hover data-popup-open:bg-layer-transparent-hover",
    "data-disabled:pointer-events-none data-disabled:text-disabled",
  ),
);

/** Indicator slot inside radio/checkbox items. */
export const menuItemIndicatorVariants = cva(
  "flex size-4 items-center justify-center text-icon-accent-primary",
);

/** Separator: a thin divider spanning the popup padding. */
export const menuSeparatorVariants = cva("-mx-1 my-1 border-t border-subtle");

/** GroupLabel: a non-interactive section heading. */
export const menuGroupLabelVariants = cva("px-2 py-1 text-12 font-medium text-tertiary");

/**
 * Label: a non-interactive section heading that can carry inline-end metadata. Used by the
 * components-tier `MenuLabel` composition.
 */
export const menuLabelVariants = cva("flex items-center gap-1.5 px-2 py-1.5 text-12 text-tertiary");

/** Arrow: a small caret matching the popup surface color. */
export const menuArrowVariants = cva("text-layer-1");
