import { cva, cx } from "class-variance-authority";

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
