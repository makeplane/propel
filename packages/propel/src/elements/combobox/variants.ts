import { cva, cx } from "class-variance-authority";

import { controlGroupClass, controlMagnitude } from "../../internal/control-group";
import { controlInputClass } from "../../internal/control-input";
import { itemIndicatorClass } from "../../internal/item-indicator";
import { listboxEmptyClass } from "../../internal/listbox-empty";
import { nodeSlotClass } from "../../internal/node-slot";
import { type StrictVariantProps } from "../../internal/variant-props";

export const comboboxInputGroupVariants = cva(
  cx(
    // Wraps a separate focusable input → the shared `focus: within` group chrome.
    controlGroupClass,
    "min-w-64 items-center gap-2 rounded-md px-3",
  ),
  {
    variants: {
      magnitude: {
        sm: controlMagnitude.sm,
        md: controlMagnitude.md,
        lg: controlMagnitude.lg,
        xl: controlMagnitude.xl,
      },
    },
  },
);
export const comboboxInputVariants = cva(cx(controlInputClass, "flex-1"));
export const comboboxItemIndicatorVariants = cva(cx(itemIndicatorClass, "size-4"));
export const comboboxEmptyVariants = cva(listboxEmptyClass);

// The multiselect variant of the input frame: chips wrap onto new rows ahead of the inline input.
// Tighter padding than `ComboboxInputGroup` so the h-6 chips sit inset like text would.
export const comboboxChipsVariants = cva(
  cx(
    // Wraps a separate focusable input → the shared `focus: within` group chrome.
    controlGroupClass,
    "min-w-64 flex-wrap items-center gap-1 rounded-md px-1.5 py-1",
  ),
  {
    variants: {
      magnitude: {
        sm: controlMagnitude.sm,
        md: controlMagnitude.md,
        lg: controlMagnitude.lg,
        xl: controlMagnitude.xl,
      },
    },
  },
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

export type ComboboxInputGroupVariantProps = StrictVariantProps<typeof comboboxInputGroupVariants>;
export type ComboboxChipsVariantProps = StrictVariantProps<typeof comboboxChipsVariants>;
type ComboboxInputGroupVariantConfig = ComboboxInputGroupVariantProps;
export type ComboboxMagnitude = ComboboxInputGroupVariantConfig["magnitude"];
