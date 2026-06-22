import { OTPFieldPreview as BaseOTPField } from "@base-ui/react/otp-field";

import { otpFieldInputVariants } from "./variants";

export type OTPFieldInputProps = Omit<BaseOTPField.Input.Props, "className" | "style">;

/** A single OTP character input cell. Maps 1:1 to `OTPFieldPreview.Input`. */
export function OTPFieldInput(props: OTPFieldInputProps) {
  return <BaseOTPField.Input className={otpFieldInputVariants()} {...props} />;
}
