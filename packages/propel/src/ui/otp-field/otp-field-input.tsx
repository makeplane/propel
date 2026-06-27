import { OTPFieldPreview as BaseOTPField } from "@base-ui/react/otp-field";

import {
  otpFieldInputVariants,
  type OTPFieldInputMagnitude,
  type OTPFieldInputVariantProps,
} from "./variants";

export type { OTPFieldInputMagnitude };

export type OTPFieldInputProps = Omit<BaseOTPField.Input.Props, "className" | "style"> &
  OTPFieldInputVariantProps;

/** A single OTP character input cell. Maps 1:1 to `OTPFieldPreview.Input`. */
export function OTPFieldInput({ magnitude, ...props }: OTPFieldInputProps) {
  return <BaseOTPField.Input className={otpFieldInputVariants({ magnitude })} {...props} />;
}
