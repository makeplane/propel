import { cva, cx } from "class-variance-authority";

import {
  disclosureTriggerClass,
  disclosureTriggerTitleClass,
} from "../../internal/disclosure-trigger";

// Collapsible is a structural disclosure primitive (the single-item form that
// Accordion generalizes). The Figma spec only defines collapsed/hover/expanded
// states, which Base UI drives as state — so there are no styling axes
// (variant/tone/magnitude) to expose. The cva pairings below hold the static
// chrome so every part is styled in one place, with no `className` at the boundary.

export const collapsibleTriggerVariants = cva(cx(disclosureTriggerClass, "w-full"));

// The trigger's growing label. `flex-1` fills the row so a trailing
// `CollapsibleTriggerIndicator` sits at the inline-end edge; `min-w-0` lets a long
// label wrap/shrink instead of overflowing.
export const collapsibleTriggerTitleVariants = cva(disclosureTriggerTitleClass);

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
