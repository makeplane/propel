import { cva, cx, type VariantProps } from "class-variance-authority";

import { fieldControlSurfaceVariants } from "../../internal/field-control-surface";

/** Root: a horizontal row of character slots (and optional separators). */
export const otpFieldRootVariants = cva("flex items-center gap-2");

/**
 * Input: a single character cell with the input chrome tokens.
 *
 * Magnitude — controls the box size (sm/md/lg); required, no default. tone — neutral for the
 * default state, danger for the error state; required, no default.
 */
// Each digit cell is itself the focusable element → `focus: self`. `danger` opts out of the shared
// accent ring (`focus: none`) and pairs it with a danger-colored ring instead.
export const otpFieldInputVariants = cva(
  "rounded-md text-center text-primary outline-none data-disabled:cursor-not-allowed data-disabled:text-disabled",
  {
    variants: {
      magnitude: {
        sm: "size-8 text-13",
        md: "size-9 text-14",
        lg: "size-10 text-16",
      },
      tone: {
        neutral: fieldControlSurfaceVariants({ tone: "neutral", focus: "self" }),
        danger: cx(
          fieldControlSurfaceVariants({ tone: "danger", focus: "none" }),
          "focus:ring-2 focus:ring-danger-strong/20",
        ),
      },
    },
  },
);

type OTPFieldInputVariantProps = VariantProps<typeof otpFieldInputVariants>;

export type OTPFieldInputMagnitude = NonNullable<OTPFieldInputVariantProps["magnitude"]>;
export type OTPFieldInputTone = NonNullable<OTPFieldInputVariantProps["tone"]>;

/** Separator: a visual divider between groups of slots (e.g. `123-456`). */
export const otpFieldSeparatorVariants = cva("text-tertiary");

/**
 * Label: the visually-hidden accessible name backing the first slot. Base UI ignores `aria-label`
 * on the first input and names it from `aria-labelledby` instead, so the field needs a real
 * (hidden) label element. Its `sr-only` styling lives here so neither the components tier nor a
 * direct composition carries a raw `className`.
 */
export const otpFieldLabelVariants = cva("sr-only");
