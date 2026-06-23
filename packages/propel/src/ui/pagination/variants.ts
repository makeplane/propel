import { cva } from "class-variance-authority";

// Shared 24px slot used by page numbers, the prev/next buttons and the ellipsis.
// 24px tall with a 24px minimum width so single digits stay square (per Figma),
// but the slot grows for wider content — multi-digit page numbers like `100` get
// their own width plus horizontal padding rather than clipping a fixed square.
// `radius/sm` for page numbers, `radius/md` for the arrow buttons.
const slotBase =
  "inline-flex h-6 w-auto min-w-6 shrink-0 items-center justify-center px-1 text-13 text-primary outline-none";

export type PaginationMagnitude = "md";

export const pageButtonVariants = cva(
  [
    slotBase,
    "rounded-sm bg-layer-transparent",
    "hover:bg-layer-transparent-hover",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
    "disabled:pointer-events-none disabled:text-disabled",
  ].join(" "),
  {
    variants: {
      magnitude: {
        // md: 24px tall, matches the Figma 24px slot — the only size defined so far.
        md: "",
      },
      // The current page reads as pressed: it sits on the `transparent-active` fill
      // (Figma "Selected") and is not interactive. It's marked `disabled` to block
      // re-navigation, but the Figma "Selected" state keeps `text/primary` — so it
      // must override the `disabled:text-disabled` dim that the base applies.
      current: {
        true: "bg-layer-transparent-active disabled:text-primary",
        false: "",
      },
    },
  },
);

export const arrowButtonVariants = cva(
  [
    slotBase,
    "rounded-md bg-layer-transparent text-icon-secondary",
    "hover:bg-layer-transparent-hover",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
    "disabled:pointer-events-none disabled:text-icon-disabled",
    // Prev/next arrows are directional — mirror them under RTL so "previous" always
    // points toward the start of the run.
    "[&>svg]:size-4 [&>svg]:shrink-0 rtl:[&>svg]:-scale-x-100",
  ].join(" "),
  {
    variants: {
      magnitude: {
        // md: 24px tall, 16px icon — the only size defined so far.
        md: "",
      },
    },
  },
);

// The non-interactive gap marker between distant page numbers.
// Sized via [&>svg] so the caller passes the icon as children (NodeSlot pattern).
export const ellipsisVariants = cva(
  [slotBase, "text-icon-placeholder", "[&>svg]:size-3.5 [&>svg]:shrink-0"].join(" "),
  {
    variants: {
      magnitude: {
        // md: 24px tall, 14px icon — the only size defined so far.
        md: "",
      },
    },
  },
);

// The per-page selector trigger (Figma `4762-503`): a `layer-3` pill, 24px tall,
// `radius/md`, holding the current size + a chevron-down. It's the trigger for the
// page-size Menu, so it gets a focus ring and rotates its chevron while the menu
// is open.
export const perPageTriggerVariants = cva(
  [
    "inline-flex h-6 min-w-10 cursor-default items-center justify-center gap-1 rounded-md px-2",
    "bg-layer-3 text-13 font-medium text-secondary outline-none",
    "hover:bg-layer-3-hover",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
    "[&>svg]:size-3.5 [&>svg]:shrink-0 [&>svg]:text-icon-secondary",
    "[&[data-popup-open]>svg]:rotate-180",
  ].join(" "),
  {
    variants: {
      magnitude: {
        // md: 24px tall pill — the only size defined so far.
        md: "",
      },
    },
  },
);
