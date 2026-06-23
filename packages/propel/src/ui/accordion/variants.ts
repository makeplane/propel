import { cva, cx } from "class-variance-authority";

import { nodeSlotClass } from "../../internal/node-slot";

// Accordion is a structural disclosure primitive: the Figma "Accordion" spec only
// defines the collapsed/hover/expanded states (which Base UI drives as state, not
// props) — so there are no styling axes (variant/tone/magnitude) to expose. The cva
// pairings below hold each part's static chrome so every part is styled in one place,
// with no `className` at the boundary.
export const accordionVariants = cva("flex w-full flex-col");

export const accordionItemVariants = cva("border-b border-subtle");

export const accordionHeaderVariants = cva("flex");

export const accordionTriggerVariants = cva(
  cx(
    "group flex flex-1 items-center gap-2 p-3 text-start [--node-size:1rem]",
    "text-14 font-medium text-primary",
    "bg-layer-transparent hover:bg-layer-transparent-hover",
    "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent-strong",
    "disabled:cursor-not-allowed disabled:opacity-60",
  ),
);

export const accordionPanelVariants = cva(
  cx(
    "h-(--accordion-panel-height) overflow-hidden",
    "text-14 text-secondary",
    "transition-[height] duration-200 ease-out",
    "data-ending-style:h-0 data-starting-style:h-0",
  ),
);

// The decorative leading icon at the trigger's inline-start. Sizes its single child
// to the trigger's `--node-size` (via the shared node-slot class) and tints it.
export const accordionTriggerIconVariants = cva(cx(nodeSlotClass, "text-icon-secondary"));

// The trigger's growing label. `flex-1` fills the row so the indicator sits at the
// trailing edge; `min-w-0` lets long labels wrap/shrink instead of overflowing.
export const accordionTriggerTitleVariants = cva("min-w-0 flex-1 text-start");

// The disclosure caret inside the trigger. Per Figma the caret points toward the
// inline-end when collapsed and rotates to point down when the panel opens (Base UI
// sets `data-panel-open` on the trigger, which carries the `group` class). The glyph
// is a chevron-down at rest (the open state), rotated a quarter-turn while collapsed —
// toward the inline-end, mirrored under RTL.
export const accordionTriggerIndicatorVariants = cva(
  cx(
    "inline-flex shrink-0 items-center justify-center text-icon-secondary",
    "transition-transform duration-200",
    "-rotate-90 group-data-panel-open:rotate-0",
    "rtl:rotate-90 rtl:group-data-panel-open:rotate-0",
  ),
);

// The padded inner content of a panel. Padding lives here, never on the
// height-animating `AccordionPanel` (padding there would jump the open/close height).
export const accordionPanelContentVariants = cva("px-3 pb-3");
