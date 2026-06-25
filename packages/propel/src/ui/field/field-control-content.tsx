import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { fieldControlContentVariants } from "./variants";

export type FieldControlContentProps = Omit<
  useRender.ComponentProps<"div">,
  "className" | "style"
> & {
  /** Label placement: `vertical` (label above) | `horizontal` (label beside). */
  orientation: "vertical" | "horizontal";
};

/** The control + helper-text column of `InputField`. */
export function FieldControlContent({ orientation, render, ...props }: FieldControlContentProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: fieldControlContentVariants({ orientation }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
