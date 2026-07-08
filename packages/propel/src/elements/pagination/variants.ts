import { cva, cx } from "class-variance-authority";

import { nodeSlotClass } from "../../internal/node-slot";

// Pagination is a structural navigation primitive: the Figma "variant" axis (all
// pages visible / near start / middle / near end) is a function of where the current
// page sits in the total, not a styling axis — so the parts carry only static chrome.
// The current page reads as selected purely from its `aria-current="page"` a11y marker
// (no styling prop). Every part renders ONE element, with its className held in the cva
// below so no `className` crosses the part boundary. The Figma 24px slot is the only
// defined size, so it is baked in (no size/magnitude axis to expose).

// The `<nav>` landmark wrapping the whole control: the optional per-page region and
// range label sit before the page-button list, laid out in a row.
export const paginationVariants = cva("flex items-center gap-4");

// The ordered list of page controls (prev, page numbers + ellipses, next).
export const paginationListVariants = cva("flex items-center gap-1.5");

// One slot in the list. A bare list item; its child (a button or the ellipsis) carries
// the chrome.
export const paginationItemVariants = cva("flex items-center");

// Shared 24px slot used by page numbers, the prev/next buttons and the ellipsis.
// 24px tall with a 24px minimum width so single digits stay square (per Figma),
// but the slot grows for wider content — multi-digit page numbers like `100` get
// their own width plus horizontal padding rather than clipping a fixed square.
// One `radius/sm` (4px, per Figma) across page numbers and arrows so the
// selected-number fill and the arrow fill share a corner radius.
const slotBase = cx(
  "inline-flex h-6 w-auto min-w-6 shrink-0 items-center justify-center px-1",
  "text-13 text-primary outline-none",
);

export const paginationPageButtonVariants = cva(
  cx(
    slotBase,
    "rounded-sm bg-layer-transparent",
    "hover:bg-layer-transparent-hover",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
    "disabled:pointer-events-none disabled:text-disabled",
    // The current page reads as pressed: it sits on the `transparent-active` fill
    // (Figma "Selected") and is not interactive. It's marked `disabled` to block
    // re-navigation AND `aria-current="page"` for a11y, so the selected styling keys
    // off `aria-current` — no separate prop. The Figma "Selected" state keeps
    // `text/primary`, so the doubled `aria-[current=page]:disabled:` specificity wins
    // over the plain `disabled:text-disabled` dim the base applies.
    "aria-[current=page]:bg-layer-transparent-active aria-[current=page]:disabled:text-primary",
  ),
);

export const paginationArrowButtonVariants = cva(
  cx(
    slotBase,
    "rounded-sm bg-layer-transparent text-icon-secondary",
    "hover:bg-layer-transparent-hover",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
    "disabled:pointer-events-none disabled:text-icon-disabled",
    // Prev/next arrows are directional — mirror them under RTL so "previous" always
    // points toward the start of the run. Sizes whatever svg is passed to 16px.
    "[&>svg]:size-4 [&>svg]:shrink-0 rtl:[&>svg]:-scale-x-100",
  ),
);

// A non-interactive gap marker between distant page numbers. Sizes its single child
// (the more-horizontal glyph, 14px) via the shared node-slot class and tints it the
// placeholder color, instead of baking a specific glyph/size in.
export const paginationEllipsisVariants = cva(
  cx(slotBase, "text-icon-placeholder [--node-size:0.875rem]", nodeSlotClass),
);

// The current page can render a spinner in place of its number while navigating to it
// is in flight. A node-slot sized to 14px that spins its child; placeholder tint.
export const paginationSpinnerVariants = cva(
  cx(nodeSlotClass, "animate-spin text-icon-placeholder [--node-size:0.875rem]"),
);

// The per-page region (Figma `50 v per page`): the selector pill followed by the
// trailing "per page" text. Grows to fill the leading space before the page list.
export const paginationPerPageVariants = cva("flex min-w-0 flex-1 items-center gap-2");

// The per-page selector trigger (Figma `4762-503`): a `layer-3` pill, 24px tall,
// `radius/md`, holding the current size + a chevron-down. It's the trigger for the
// page-size Menu, so it gets a focus ring; the `group` lets its chevron indicator
// rotate while the menu is open.
export const paginationPerPageTriggerVariants = cva(
  cx(
    "group inline-flex h-6 min-w-10 cursor-default items-center justify-center gap-1 rounded-md px-2",
    "bg-layer-3 text-13 font-medium text-secondary outline-none",
    "hover:bg-layer-3-hover",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
  ),
);

// The chevron indicator inside the per-page trigger. Sizes its single child (14px) and
// rotates a half-turn while the menu is open (Base UI sets `data-popup-open` on the
// trigger, which carries the `group` class).
export const paginationPerPageIndicatorVariants = cva(
  cx(
    nodeSlotClass,
    "text-icon-secondary [--node-size:0.875rem]",
    "transition-transform duration-200 group-data-popup-open:rotate-180",
  ),
);

// The trailing "per page" text after the selector pill.
export const paginationPerPageLabelVariants = cva("text-13 whitespace-nowrap text-tertiary");

// The optional range label shown before the controls (Figma `1-50 of 250`): tertiary,
// nowrap. The current range inside it is emphasized via `PaginationRangeCurrent`.
export const paginationRangeVariants = cva("text-12 whitespace-nowrap text-tertiary");

// The emphasized current-range portion (e.g. `1-50`) inside `PaginationRange`.
export const paginationRangeCurrentVariants = cva("text-primary");
