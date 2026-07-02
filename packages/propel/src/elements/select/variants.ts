import { cva, cx, type VariantProps } from "class-variance-authority";

import { fieldControlSurfaceVariants } from "../../internal/field-control-surface";
import { nodeSlotClass } from "../../internal/node-slot";
import { type StrictVariantProps } from "../../internal/variant-props";

// The field region that stacks the label over the trigger as a column. Holds the
// gap between `SelectLabel` and `SelectTrigger`; sizes to its widest child (the
// trigger carries `min-w-48`) so the label never forces the column wider.
export const selectFieldVariants = cva("flex w-fit flex-col gap-1.5");

export const selectLabelVariants = cva("text-14 font-medium text-primary");

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
        sm: "h-7 text-13 [--node-size:0.875rem]",
        md: "h-8 text-13 [--node-size:0.875rem]",
        lg: "h-9 text-14 [--node-size:1rem]",
      },
    },
  },
);

// The trailing chevron slot: a node-slot sized to `--node-size`. Always decorative;
// the trigger carries the accessible state.
export const selectIconVariants = cva(cx(nodeSlotClass, "text-icon-secondary"));

// The selection checkmark slot inside an item: a node-slot tinted to the accent.
// Always left-aligned per the Figma spec; the 1rem grid column in the shared listbox
// item (`internal/listbox-item`) reserves the space whether the indicator shows or not.
export const selectItemIndicatorVariants = cva(
  cx(nodeSlotClass, "text-icon-accent-primary [--node-size:1rem]"),
);

export type SelectTriggerMagnitude = NonNullable<
  VariantProps<typeof selectTriggerVariants>["magnitude"]
>;

export type SelectTriggerVariantProps = StrictVariantProps<typeof selectTriggerVariants>;
