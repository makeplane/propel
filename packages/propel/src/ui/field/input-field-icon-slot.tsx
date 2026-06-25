import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { inputFieldIconSlotVariants } from "./variants";

export type InputFieldIconSlotProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/** A 16px decorative slot rendered at the inline start/end of the `InputField` control. */
export function InputFieldIconSlot({ render, ...props }: InputFieldIconSlotProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: inputFieldIconSlotVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
