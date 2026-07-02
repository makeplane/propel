import { cva, cx } from "class-variance-authority";

import { nodeSlotClass } from "../../internal/node-slot";

// Collapsible is a structural disclosure primitive (the single-item form that
// Accordion generalizes). The Figma spec only defines collapsed/hover/expanded
// states, which Base UI drives as state — so there are no styling axes
// (variant/tone/magnitude) to expose. The cva pairings below hold the static
// chrome so every part is styled in one place, with no `className` at the boundary.

export const collapsibleTriggerVariants = cva(
  cx(
    "group flex w-full items-center gap-2 text-start [--node-size:1rem]",
    "text-14 font-medium text-primary",
    "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent-strong",
    "disabled:cursor-not-allowed disabled:opacity-60",
  ),
);

// The trigger's growing label. `flex-1` fills the row so a trailing
// `CollapsibleTriggerIndicator` sits at the inline-end edge; `min-w-0` lets a long
// label wrap/shrink instead of overflowing.
export const collapsibleTriggerTitleVariants = cva("min-w-0 flex-1 text-start");

export const collapsiblePanelVariants = cva(
  cx(
    // Base UI exposes the panel's natural size as `--collapsible-panel-height`;
    // transition from it to 0 on the starting/ending styles for a smooth collapse.
    "h-(--collapsible-panel-height) overflow-hidden",
    "text-14 text-secondary",
    "transition-[height] duration-200 ease-out",
    "data-ending-style:h-0 data-starting-style:h-0",
  ),
);

// The padded inner content of a panel. Padding lives here, never on the
// height-animating `CollapsiblePanel` (padding there would offset the measured
// open/close height and jump the transition).
export const collapsiblePanelContentVariants = cva("pt-2");

// The disclosure caret at the trigger's inline-end. The caret (a chevron-down)
// points inline-end while collapsed and rotates down when the panel opens —
// mirrored in RTL so it keeps pointing into the reading direction. Base UI
// sets `data-panel-open` on the trigger which carries the `group` class. Single-
// element slot — callers pass any svg and it is sized to `--node-size`.
export const collapsibleTriggerIndicatorVariants = cva(
  cx(
    nodeSlotClass,
    "text-icon-secondary",
    "transition-transform duration-200",
    "-rotate-90 group-data-panel-open:rotate-0",
    "rtl:rotate-90 rtl:group-data-panel-open:rotate-0",
  ),
);
