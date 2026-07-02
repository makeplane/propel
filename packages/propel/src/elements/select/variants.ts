import { cva, cx, type VariantProps } from "class-variance-authority";

import { controlMagnitude } from "../../internal/control-group";
import { controlLabelClass } from "../../internal/control-group";
import { fieldControlSurfaceVariants } from "../../internal/field-control-surface";
import { itemIndicatorClass } from "../../internal/item-indicator";
import { type StrictVariantProps } from "../../internal/variant-props";

// The field region that stacks the label over the trigger as a column. Holds the
// gap between `SelectLabel` and `SelectTrigger`; sizes to its widest child (the
// trigger carries `min-w-48`) so the label never forces the column wider.
export const selectFieldVariants = cva("flex w-fit flex-col gap-1.5");

export const selectLabelVariants = cva(controlLabelClass);

// The trigger wraps the selected value + trailing icon in a single flex row.
// Height, text size, and icon size track the magnitude axis (Figma "Size").
export const selectTriggerVariants = cva(
  cx(
    // The trigger is itself the focusable element → `focus: visible`.
    fieldControlSurfaceVariants({ focus: "visible" }),
    "flex min-w-48 items-center justify-between gap-2 rounded-md px-3 text-primary outline-none",
    "hover:border-subtle-1 hover:bg-layer-2-hover",
    "data-disabled:cursor-not-allowed data-disabled:text-disabled",
  ),
  {
    variants: {
      // Figma "Size" axis: three trigger heights with matching text and icon sizes.
      magnitude: {
        sm: controlMagnitude.sm,
        md: controlMagnitude.md,
        lg: controlMagnitude.lg,
      },
    },
  },
);

// The selection checkmark slot inside an item: a node-slot tinted to the accent.
// Always left-aligned per the Figma spec; the 1rem grid column in the shared listbox
// item (`internal/listbox-item`) reserves the space whether the indicator shows or not.
export const selectItemIndicatorVariants = cva(itemIndicatorClass);

export type SelectTriggerMagnitude = NonNullable<
  VariantProps<typeof selectTriggerVariants>["magnitude"]
>;

export type SelectTriggerVariantProps = StrictVariantProps<typeof selectTriggerVariants>;
