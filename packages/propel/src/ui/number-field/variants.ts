import { type VariantProps, cva, cx } from "class-variance-authority";

import { fieldControlSurfaceVariants } from "../../internal/field-control-surface";
import { type StrictVariantProps } from "../../internal/variant-props";

export const numberFieldVariants = cva("flex min-w-0 flex-col gap-1.5");
export const numberFieldGroupVariants = cva(
  cx(
    // Wraps a separate focusable input → `focus: within`.
    fieldControlSurfaceVariants({ focus: "within" }),
    "flex w-fit items-center overflow-hidden rounded-md",
    "data-disabled:cursor-not-allowed data-disabled:border-subtle data-disabled:bg-layer-2",
  ),
);

// Input geometry per magnitude. Heights match the stepper button square (the steppers render as
// IconButtons whose `magnitude` matches) so the group container stays flush. The width is fixed to
// accommodate up to ~4 digits.
export const numberFieldInputVariants = cva(
  "w-14 bg-transparent text-center text-14 text-primary outline-none disabled:text-disabled",
  {
    variants: {
      magnitude: {
        sm: "h-5",
        md: "h-6",
        lg: "h-7",
        xl: "h-8",
      },
    },
  },
);

export type NumberFieldInputVariantProps = StrictVariantProps<typeof numberFieldInputVariants>;

// Shared magnitude type so all parts (input + the IconButton steppers) stay in sync.
export type NumberFieldMagnitude = NonNullable<
  VariantProps<typeof numberFieldInputVariants>["magnitude"]
>;
