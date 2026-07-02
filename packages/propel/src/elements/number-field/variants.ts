import { type VariantProps, cva, cx } from "class-variance-authority";

import { controlGroupClass } from "../../internal/control-group";
import { controlInputClass } from "../../internal/control-input";
import { type StrictVariantProps } from "../../internal/variant-props";

export const numberFieldVariants = cva("flex min-w-0 flex-col gap-1.5");
export const numberFieldGroupVariants = cva(
  cx(
    // Wraps a separate focusable input → the shared `focus: within` group chrome.
    controlGroupClass,
    "w-fit items-center overflow-hidden rounded-md",
  ),
);

// Input geometry per magnitude. Heights match the stepper button square (the steppers render as
// IconButtons whose `magnitude` matches) so the group container stays flush. The width is fixed to
// accommodate up to ~4 digits.
export const numberFieldInputVariants = cva(cx(controlInputClass, "w-14 text-center text-14"), {
  variants: {
    magnitude: {
      sm: "h-5",
      md: "h-6",
      lg: "h-7",
      xl: "h-8",
    },
  },
});

export type NumberFieldInputVariantProps = StrictVariantProps<typeof numberFieldInputVariants>;

// Shared magnitude type so all parts (input + the IconButton steppers) stay in sync.
export type NumberFieldMagnitude = NonNullable<
  VariantProps<typeof numberFieldInputVariants>["magnitude"]
>;
