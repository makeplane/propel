import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import {
  otpFieldInputVariants,
  type OTPFieldInputMagnitude,
  type OTPFieldInputVariantProps,
} from "./variants";

export type { OTPFieldInputMagnitude };

export type OTPFieldInputProps = Omit<useRender.ComponentProps<"input">, "className" | "style"> &
  OTPFieldInputVariantProps;

/**
 * A single styled OTP character cell. Base-UI-agnostic; graft the slot behavior in `components` via
 * `<BaseOTPField.Input render={<OTPFieldInput/>} />`.
 */
export function OTPFieldInput({ magnitude, render, ...props }: OTPFieldInputProps) {
  const defaultProps: useRender.ElementProps<"input"> = {
    className: otpFieldInputVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "input", render, props: mergeProps(defaultProps, props) });
}
