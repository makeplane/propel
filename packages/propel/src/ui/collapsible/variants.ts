import { cva, cx } from "class-variance-authority";

// Collapsible is a structural disclosure primitive (the single-item form that
// Accordion generalizes). The Figma spec only defines collapsed/hover/expanded
// states, which Base UI drives as state — so there are no styling axes
// (variant/tone/magnitude) to expose. The cva pairings below hold the static
// chrome so every part is styled in one place, with no `className` at the boundary.

export const collapsibleTriggerVariants = cva(
  cx(
    "group flex w-full items-center justify-between gap-2 text-start",
    "text-14 font-medium text-primary",
    "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent-strong",
    "disabled:cursor-not-allowed disabled:opacity-60",
  ),
);

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
