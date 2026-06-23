import { cva, cx } from "class-variance-authority";

// Dialog is a structural overlay primitive. Base UI drives every interactive
// state (open/closed, starting/ending transition styles) as data attributes.
// Width (magnitude) is an adjustable axis per the design spec; every other
// structural chrome is baked in. The cva pairings below hold all static
// and variant-driven styling so each part is styled in one place, with no
// `className` at the boundary. Root, Trigger, and Portal carry no styling.

export const dialogBackdropVariants = cva(
  cx(
    "fixed inset-0 bg-backdrop transition-opacity duration-200",
    "data-ending-style:opacity-0 data-starting-style:opacity-0",
  ),
);

export const dialogViewportVariants = cva(
  "fixed inset-0 z-50 flex items-center justify-center p-4",
);

export const dialogPopupVariants = cva(
  cx(
    // chrome — no padding; per-section parts (Header/Body/Actions) own their
    // own padding so each region can scroll or space correctly.
    "flex flex-col gap-4 rounded-lg border-sm border-subtle bg-layer-1 shadow-overlay-100 outline-none",
    // max-height: cap the popup at the viewport (minus gutter) so the body scrolls
    // rather than the whole dialog overflowing.
    "max-h-[calc(100dvh-2rem)]",
    // open/close animation
    "origin-(--transform-origin) transition-[opacity,transform] duration-200",
    "data-starting-style:scale-95 data-starting-style:opacity-0",
    "data-ending-style:scale-95 data-ending-style:opacity-0",
  ),
  {
    variants: {
      // Width axis — "always adjustable" per the design spec. sm/md/lg are
      // the Figma widths; required so each call-site is explicit.
      magnitude: {
        sm: "w-80", // 320px
        md: "w-96", // 384px
        lg: "w-128",
      },
    },
  },
);

export const dialogTitleVariants = cva("text-16 font-semibold text-primary");

export const dialogDescriptionVariants = cva("text-14 text-secondary");

// DialogHeader: the row that holds the title (and optional description below it)
// alongside the inline-end close button. Padding matches the popup's top/side
// gutter; there is no bottom padding — the gap on the popup provides spacing.
export const dialogHeaderVariants = cva("flex items-start justify-between gap-4 px-4 pt-4");

// DialogBody: the scrollable main content region. `min-h-0 flex-1 overflow-y-auto`
// lets it shrink inside the flex popup so the actions stay pinned at the bottom;
// `overscroll-contain` prevents the page from scrolling when the body hits its limit.
export const dialogBodyVariants = cva("min-h-0 flex-1 overflow-y-auto overscroll-contain px-4");

// DialogActions: the right-aligned footer row for action buttons. Padding mirrors
// the header gutter. Sticks to the bottom via the flex popup layout.
export const dialogActionsVariants = cva("flex justify-end gap-2 px-4 pb-4");
