import { cva, cx, type VariantProps } from "class-variance-authority";

import { overlayActionsClass, overlayCloseClass } from "../../internal/overlay-frame";
import { type StrictVariantProps } from "../../internal/variant-props";

// Drawer styles its edge-anchored parts here, one place, with no `className` at
// the boundary. Base UI drives open/closed and swipe state as data attributes, so
// the only styling axis exposed is the popup's anchor `side` (an adjustable axis
// per the spec). The shared overlay surfaces — the dimmed backdrop and the
// title/description heading pair — are adopted from `internal/` (`Backdrop`,
// `OverlayTitle`, `OverlayDescription`) and grafted in `components`, so they carry
// no drawer-specific cva. Behavior-only roles (Root, Provider, Indent,
// IndentBackground, SwipeArea, Portal, Trigger) render no styled element and carry
// no styling.

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

type DrawerPopupVariantConfig = VariantProps<typeof drawerPopupVariants>;
export type DrawerPopupSide = NonNullable<DrawerPopupVariantConfig["side"]>;
export type DrawerPopupVariantProps = StrictVariantProps<typeof drawerPopupVariants>;

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
export const drawerFooterVariants = cva(cx(overlayActionsClass, "items-center"));

export const drawerCloseVariants = cva(overlayCloseClass);
