import { cva, cx } from "class-variance-authority";

import { fieldControlSurfaceVariants } from "../../internal/field-control-surface";
import { nodeSlotClass } from "../../internal/node-slot";

export const comboboxLabelVariants = cva("text-14 font-medium text-primary");
export const comboboxInputGroupVariants = cva(
  cx(
    // Wraps a separate focusable input → `focus: within`.
    fieldControlSurfaceVariants({ focus: "within" }),
    "flex min-h-9 min-w-64 items-center gap-2 rounded-md px-3",
    "data-disabled:cursor-not-allowed data-disabled:text-disabled",
  ),
);
export const comboboxInputVariants = cva(
  "min-w-0 flex-1 bg-transparent text-14 text-primary outline-none placeholder:text-placeholder disabled:text-disabled",
);
export const comboboxItemIndicatorVariants = cva(
  cx(nodeSlotClass, "size-4 [--node-size:1rem] not-data-selected:invisible"),
);
export const comboboxEmptyVariants = cva("px-2 py-1.5 text-13 text-tertiary");

// The multiselect variant of the input frame: chips wrap onto new rows ahead of the inline input.
// Tighter padding than `ComboboxInputGroup` so the h-6 chips sit inset like text would.
export const comboboxChipsVariants = cva(
  cx(
    // Wraps a separate focusable input → `focus: within`.
    fieldControlSurfaceVariants({ focus: "within" }),
    "flex min-h-9 min-w-64 flex-wrap items-center gap-1 rounded-md px-1.5 py-1",
    "data-disabled:cursor-not-allowed data-disabled:text-disabled",
  ),
);
// One selected value, rendered as a removable tag (the neutral badge chrome). Arrow keys move
// focus onto a chip, so it carries the standard focus ring.
export const comboboxChipVariants = cva(
  cx(
    "flex h-6 shrink-0 cursor-default items-center gap-1 rounded-sm bg-layer-3 ps-1.5 pe-0.5 text-13 text-secondary",
    "outline-none focus-visible:ring-2 focus-visible:ring-accent-strong",
    "data-disabled:cursor-not-allowed data-disabled:text-disabled",
  ),
);
// The chip's remove affordance; pass an X-style svg.
export const comboboxChipRemoveVariants = cva(
  cx(
    nodeSlotClass,
    "size-4 cursor-pointer rounded-sm text-icon-secondary [--node-size:0.75rem]",
    "outline-none hover:bg-layer-transparent-hover focus-visible:ring-2 focus-visible:ring-accent-strong",
    "disabled:cursor-not-allowed disabled:text-icon-disabled",
  ),
);
