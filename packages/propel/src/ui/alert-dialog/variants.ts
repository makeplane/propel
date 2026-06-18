import { cva, cx } from "class-variance-authority";

// AlertDialog is a structural overlay primitive. It is always modal and
// non-dismissible, and Base UI drives every interactive state (open/closed,
// starting/ending transition styles) as data attributes — so there are no
// styling axes (variant/tone/magnitude) to expose. The cva pairings below hold
// the static chrome so each part is styled in one place, with no `className` at
// the boundary. Root, Trigger, and Portal carry no styling.

export const alertDialogBackdropVariants = cva(
  cx(
    "fixed inset-0 bg-backdrop transition-opacity duration-200",
    "data-ending-style:opacity-0 data-starting-style:opacity-0",
  ),
);

export const alertDialogViewportVariants = cva(
  "fixed inset-0 z-50 flex items-center justify-center p-4",
);

export const alertDialogPopupVariants = cva(
  cx(
    "rounded-lg border-sm border-subtle bg-layer-1 p-4 shadow-overlay-100 outline-none",
    "origin-(--transform-origin) transition-[opacity,transform] duration-200",
    "data-starting-style:scale-95 data-starting-style:opacity-0",
    "data-ending-style:scale-95 data-ending-style:opacity-0",
  ),
);

export const alertDialogTitleVariants = cva("text-16 font-semibold text-primary");

export const alertDialogDescriptionVariants = cva("text-14 text-secondary");

export const alertDialogCloseVariants = cva(
  cx(
    "inline-flex items-center justify-center rounded-md text-icon-secondary outline-none",
    "hover:bg-layer-transparent-hover",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
  ),
);
