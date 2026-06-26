import { OTPFieldPreview as BaseOTPField } from "@base-ui/react/otp-field";

import {
  otpFieldInputVariants,
  type OTPFieldInputMagnitude,
  type OTPFieldInputTone,
  type OTPFieldInputVariantProps,
} from "./variants";

export type { OTPFieldInputMagnitude, OTPFieldInputTone };

export type OTPFieldInputProps = Omit<BaseOTPField.Input.Props, "className" | "style"> &
  OTPFieldInputVariantProps;

/** A single OTP character input cell. Maps 1:1 to `OTPFieldPreview.Input`. */
export function OTPFieldInput({ magnitude, tone, ...props }: OTPFieldInputProps) {
  return <BaseOTPField.Input className={otpFieldInputVariants({ magnitude, tone })} {...props} />;
}
