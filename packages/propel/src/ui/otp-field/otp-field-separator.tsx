import { OTPFieldPreview as BaseOTPField } from "@base-ui/react/otp-field";

import { otpFieldSeparatorVariants } from "./variants";

export type OTPFieldSeparatorProps = Omit<BaseOTPField.Separator.Props, "className" | "style">;

/** A divider between groups of slots, e.g. `123-456`. Maps 1:1 to `OTPFieldPreview.Separator`. */
export function OTPFieldSeparator(props: OTPFieldSeparatorProps) {
  return <BaseOTPField.Separator className={otpFieldSeparatorVariants()} {...props} />;
}
