import { OTPFieldPreview as BaseOTPField } from "@base-ui/react/otp-field";
import type * as React from "react";

import { otpFieldInputVariants } from "./variants";

export type OTPFieldInputProps = Omit<
  React.ComponentProps<typeof BaseOTPField.Input>,
  "className" | "style"
>;

/** A single OTP character input cell. Maps 1:1 to `OTPFieldPreview.Input`. */
export function OTPFieldInput(props: OTPFieldInputProps) {
  return <BaseOTPField.Input className={otpFieldInputVariants()} {...props} />;
}
