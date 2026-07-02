import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { inputIconVariants } from "./variants";

export type InputIconSlotProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/** A 16px decorative slot rendered at the inline start/end of the the input control. */
export function InputIcon({ render, ...props }: InputIconSlotProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: inputIconVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
