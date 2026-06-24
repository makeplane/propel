import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { inputFieldContentVariants } from "./variants";

export type InputFieldContentProps = Omit<
  useRender.ComponentProps<"div">,
  "className" | "style"
> & {
  /** Label placement: `vertical` (label above) | `horizontal` (label beside). */
  orientation: "vertical" | "horizontal";
};

/** The control + helper-text column of `InputField`. */
export function InputFieldContent({ orientation, render, ...props }: InputFieldContentProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: inputFieldContentVariants({ orientation }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
