import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { otpFieldVariants } from "./variants";

export type OTPFieldProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled OTP field container — a horizontal row of character slots (and optional separators).
 * Base-UI-agnostic; graft the field behavior in `components` via `<BaseOTPField.Root
 * render={<OTPField/>} />`.
 */
export function OTPField({ render, ...props }: OTPFieldProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: otpFieldVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
