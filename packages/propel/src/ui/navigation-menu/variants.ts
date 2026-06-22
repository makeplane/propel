import { cva, cx } from "class-variance-authority";

// Navigation Menu is a verbatim wrapping of Base UI's parts. Base UI drives all
// open/active state through `data-*` attributes, so there are no styling axes
// (variant/tone/magnitude) to expose. The cva pairings below hold the static
// chrome for every styled part in one place, with no `className` at the boundary.

export const navigationMenuListVariants = cva("flex items-center gap-1");

// Trigger and Link share the nav-item chrome: a pill that highlights on hover and
// while its popup is open, with a focus-visible accent ring.
export const navigationMenuTriggerVariants = cva(
  cx(
    "group inline-flex h-8 items-center gap-1 rounded-md px-3 text-13 font-medium text-secondary outline-none",
    "hover:bg-layer-transparent-hover data-popup-open:bg-layer-transparent-selected",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
  ),
);

export const navigationMenuLinkVariants = cva(
  cx(
    "inline-flex h-8 items-center gap-1 rounded-md px-3 text-13 font-medium text-secondary outline-none",
    "hover:bg-layer-transparent-hover data-popup-open:bg-layer-transparent-selected",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
  ),
);

// Rotates the caret while the popup is open; reads the parent Trigger's
// `group-data-popup-open` state.
export const navigationMenuIconVariants = cva(
  "flex size-4 items-center justify-center text-icon-secondary transition-transform group-data-popup-open:rotate-180",
);

export const navigationMenuPositionerVariants = cva("z-50 outline-none");

export const navigationMenuPopupVariants = cva(
  cx(
    "origin-(--transform-origin) rounded-lg border-sm border-subtle bg-layer-1 p-2 shadow-overlay-100 outline-none",
    "transition-[opacity,transform] duration-150",
    "data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
  ),
);

// Content morph container: Base UI exposes the active panel's size as
// `--popup-width`/`--popup-height`, transitioned for a smooth resize between items.
export const navigationMenuViewportVariants = cva(
  "relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) transition-[width,height] duration-150",
);

export const navigationMenuBackdropVariants = cva(
  cx(
    "fixed inset-0 bg-backdrop transition-opacity duration-200",
    "data-ending-style:opacity-0 data-starting-style:opacity-0",
  ),
);
