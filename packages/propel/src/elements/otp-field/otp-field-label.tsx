import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { otpFieldLabelVariants } from "./variants";

export type OTPFieldLabelProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The visually-hidden accessible name for the field's first slot. Base UI ignores `aria-label` on
 * the first input and names it from `aria-labelledby` instead, so render this with an `id` and
 * point the first `OTPFieldInput`'s `aria-labelledby` at it. Without it the slot inputs fail axe's
 * "Form elements must have labels". Hidden via `sr-only`, so it stays available to assistive tech.
 */
export function OTPFieldLabel({ render, ...props }: OTPFieldLabelProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: otpFieldLabelVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
