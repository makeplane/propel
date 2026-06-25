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
    fieldControlSurfaceVariants({ tone: "neutral", focus: "visible" }),
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

export const selectPositionerVariants = cva("z-50 outline-none");
export const selectPopupVariants = cva(
  cx(
    "max-h-[min(var(--available-height),18rem)] min-w-(--anchor-width) overflow-y-auto rounded-md border-sm border-subtle bg-layer-1 p-1 shadow-overlay-100",
    "origin-(--transform-origin)",
  ),
);

// Item rows: shared chrome + magnitude variants for height and text size.
export const selectItemVariants = cva(
  cx(
    "grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-sm px-2 text-primary outline-none",
    "data-highlighted:bg-layer-transparent-hover data-highlighted:text-primary",
    "data-disabled:cursor-not-allowed data-disabled:text-disabled",
  ),
  {
    variants: {
      // Figma "Size" axis: three row heights with matching text sizes.
      magnitude: {
        sm: "min-h-7 text-13",
        md: "min-h-8 text-13",
        lg: "min-h-9 text-14",
      },
    },
  },
);

// The selection checkmark slot inside an item: a node-slot tinted to the accent.
// Always left-aligned per the Figma spec; the 1rem grid column in selectItemVariants
// reserves the space whether the indicator is visible or not.
export const selectItemIndicatorVariants = cva(
  cx(nodeSlotClass, "text-icon-accent-primary [--node-size:1rem]"),
);

export type SelectItemMagnitude = NonNullable<VariantProps<typeof selectItemVariants>["magnitude"]>;

export type SelectItemVariantProps = StrictVariantProps<typeof selectItemVariants>;

export type SelectTriggerMagnitude = NonNullable<
  VariantProps<typeof selectTriggerVariants>["magnitude"]
>;

export type SelectTriggerVariantProps = StrictVariantProps<typeof selectTriggerVariants>;
