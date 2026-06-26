import { OTPFieldPreview as BaseOTPField } from "@base-ui/react/otp-field";

import { otpFieldVariants } from "./variants";

export type OTPFieldProps = Omit<BaseOTPField.Root.Props, "className" | "style">;

/**
 * A one-time-password / verification-code field composed of individual character slots. Drive the
 * number of slots with the required `length` prop; render one `OTPFieldInput` per slot inside. Maps
 * 1:1 to Base UI's `OTPFieldPreview.Root` (in preview upstream — its API may change).
 */
export function OTPField(props: OTPFieldProps) {
  return <BaseOTPField.Root className={otpFieldVariants()} {...props} />;
}
