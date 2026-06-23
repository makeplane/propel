import { cva, cx } from "class-variance-authority";

// Drawer wraps Base UI's drawer parts 1:1, plus a few layout-region extensions
// (Header, HeaderContent, Body, Footer) that the Figma spec defines as the
// always-the-same header/body/footer structure. Base UI drives open/closed and
// swipe state as data attributes, so the only styling axis exposed is the popup's
// anchor `side` (an adjustable axis per the spec). Every part is styled in one
// place here, with no `className` at the boundary. Structural parts (Provider,
// Indent, IndentBackground, Root, Trigger, SwipeArea, Portal) carry no styling.

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

// The drawer's top region (Figma "header"): the title/description heading block at
// the inline-start and an optional corner close at the inline-end, on one baseline.
export const drawerHeaderVariants = cva("flex items-start justify-between gap-4");

// The stacked title + description inside the header. `min-w-0` lets a long title
// wrap instead of pushing the corner close off the row.
export const drawerHeaderContentVariants = cva("flex min-w-0 flex-col gap-1");

// The drawer's main content region (Figma "body"). Grows to fill the space between
// the header and footer and scrolls its overflow; the secondary text tone is the
// baked-in body style.
export const drawerBodyVariants = cva(
  "flex min-h-0 flex-1 flex-col gap-2 overflow-auto text-14 text-secondary",
);

// The drawer's footer actions region (Figma "footer"). Actions sit at the inline-end.
export const drawerFooterVariants = cva("flex items-center justify-end gap-2");

export const drawerTitleVariants = cva("text-16 font-semibold text-primary");

export const drawerDescriptionVariants = cva("text-14 text-secondary");

export const drawerCloseVariants = cva(
  cx(
    "inline-flex items-center justify-center rounded-md text-icon-secondary outline-none",
    "hover:bg-layer-transparent-hover",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
  ),
);
