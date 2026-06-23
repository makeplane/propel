import { cva, cx } from "class-variance-authority";

// Drawer wraps Base UI's drawer parts 1:1. Base UI drives open/closed and swipe
// state as data attributes, so there are no styling axes (variant/tone/magnitude)
// to expose. The cva pairings below hold the static chrome for the parts that
// need it, so every part is styled in one place with no `className` at the
// boundary. Structural parts (Provider, Indent, IndentBackground, Root, Trigger,
// SwipeArea, Portal) carry no styling.

export const drawerBackdropVariants = cva(
  cx(
    "fixed inset-0 bg-backdrop transition-opacity duration-200",
    "data-ending-style:opacity-0 data-starting-style:opacity-0",
  ),
);

export const drawerViewportVariants = cva("fixed inset-0 z-50");

// `side` is the anchor edge: "end" pins to the inline-end (right in LTR) and
// "start" pins to the inline-start (left in LTR). The shadow border and slide
// animation both follow the side — "end" has a leading-edge border-s and slides
// right; "start" has a leading-edge border-e and slides left.
export const drawerPopupVariants = cva(
  cx(
    "fixed inset-y-0 z-50 flex h-full w-80 max-w-[90vw] flex-col",
    "border-subtle bg-layer-1 shadow-overlay-100 outline-none",
    "transition-transform duration-200",
  ),
  {
    variants: {
      side: {
        end: cx(
          "inset-e-0 border-s-sm",
          "data-ending-style:translate-x-full data-starting-style:translate-x-full",
        ),
        start: cx(
          "inset-s-0 border-e-sm",
          "data-ending-style:-translate-x-full data-starting-style:-translate-x-full",
        ),
      },
    },
  },
);

export const drawerContentVariants = cva("flex min-h-0 flex-1 flex-col gap-2 p-4");

export const drawerTitleVariants = cva("text-16 font-semibold text-primary");

export const drawerDescriptionVariants = cva("text-14 text-secondary");

export const drawerCloseVariants = cva(
  cx(
    "inline-flex items-center justify-center rounded-md text-icon-secondary outline-none",
    "hover:bg-layer-transparent-hover",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
  ),
);
