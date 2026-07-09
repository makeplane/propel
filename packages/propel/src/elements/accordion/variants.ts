import { cva, cx } from "class-variance-authority";

import {
  disclosureTriggerClass,
  disclosureTriggerTitleClass,
} from "../../internal/disclosure-trigger";
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
  cx(disclosureTriggerClass, "flex-1 bg-layer-transparent p-3 hover:bg-layer-transparent-hover"),
);

// The trigger's leading icon slot. Re-declares `--node-size` on itself (rather than on the
// trigger row) so it can be smaller than the row's inherited default — the same pattern used by
// `DisclosureIndicator` to size the trailing caret independently — without shrinking the row's
// shared `--node-size` that `disclosureTriggerClass` also feeds the (accordion-only) chevron.
export const accordionTriggerIconVariants = cva(cx(nodeSlotClass, "[--node-size:0.875rem]"));

export const accordionPanelVariants = cva(
  cx(
    "h-(--accordion-panel-height) overflow-hidden",
    "text-13 font-regular text-secondary",
    "transition-[height] duration-200 ease-out",
    "data-ending-style:h-0 data-starting-style:h-0",
  ),
);

// The trigger's growing label. `flex-1` fills the row so the indicator sits at the
// trailing edge; `min-w-0` lets long labels wrap/shrink instead of overflowing.
export const accordionTriggerTitleVariants = cva(disclosureTriggerTitleClass);

// The padded inner content of a panel. Padding lives here, never on the
// height-animating `AccordionPanel` (padding there would jump the open/close height).
export const accordionPanelContentVariants = cva("px-3 pt-1.5 pb-3");
