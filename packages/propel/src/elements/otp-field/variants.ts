import { cva, cx, type VariantProps } from "class-variance-authority";

import { controlMagnitude } from "../../internal/control-group";
import { fieldControlSurfaceVariants } from "../../internal/field-control-surface";
import { type StrictVariantProps } from "../../internal/variant-props";

/** Root: a horizontal row of character slots (and optional separators). */
export const otpFieldVariants = cva("flex items-center gap-2");

/**
 * Input: a single character cell with the shared field-control surface.
 *
 * Magnitude — controls the box size (sm/md/lg); required, no default. The error look isn't a prop:
 * the cell rests at the `subtle` border and recolors to `danger` off Base UI's `data-invalid` (set
 * on the digit when the field is wrapped in a `Field.Root invalid`), including the danger focus
 * ring — so there's no hand-rolled danger ring here.
 */
export const otpFieldInputVariants = cva(
  cx(
    // Each digit cell is itself the focusable element → `focus: self`.
    fieldControlSurfaceVariants({ focus: "self" }),
    "rounded-md text-center text-primary outline-none data-disabled:cursor-not-allowed data-disabled:text-disabled",
  ),
  {
    variants: {
      // One step relabeled onto the shared control scale: the old sm/md/lg pixels were the
      // scale's md/lg/(near-)xl. Square cells: shared height + a matching width.
      magnitude: {
        md: cx(controlMagnitude.md, "w-8"),
        lg: cx(controlMagnitude.lg, "w-9"),
        xl: cx(controlMagnitude.xl, "w-10"),
      },
    },
  },
);

type OTPFieldInputVariantConfig = VariantProps<typeof otpFieldInputVariants>;

export type OTPFieldInputMagnitude = NonNullable<OTPFieldInputVariantConfig["magnitude"]>;
export type OTPFieldInputVariantProps = StrictVariantProps<typeof otpFieldInputVariants>;

/** Separator: a visual divider between groups of slots (e.g. `123-456`). */
export const otpFieldSeparatorVariants = cva("text-tertiary");

/**
 * Label: the visually-hidden accessible name backing the first slot. Base UI ignores `aria-label`
 * on the first input and names it from `aria-labelledby` instead, so the field needs a real
 * (hidden) label element. Its `sr-only` styling lives here so neither the components tier nor a
 * direct composition carries a raw `className`.
 */
export const otpFieldLabelVariants = cva("sr-only");
