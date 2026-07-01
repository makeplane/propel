import type * as React from "react";

import { otpFieldLabelVariants } from "./variants";

export type OTPFieldLabelProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** The visually-hidden accessible name text for the first slot. */
  children?: React.ReactNode;
};

/**
 * The visually-hidden accessible name for the field's first slot. Base UI ignores `aria-label` on
 * the first input and names it from `aria-labelledby` instead, so render this with an `id` and
 * point the first `OTPFieldInput`'s `aria-labelledby` at it. Without it the slot inputs fail axe's
 * "Form elements must have labels". Hidden via `sr-only`, so it stays available to assistive tech.
 */
export function OTPFieldLabel(props: OTPFieldLabelProps) {
  return <span className={otpFieldLabelVariants()} {...props} />;
}
