import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type FieldControlContentVariantProps, fieldControlContentVariants } from "./variants";

export type { FieldControlContentVariantProps } from "./variants";

export type FieldControlContentProps = Omit<
  useRender.ComponentProps<"div">,
  "className" | "style"
> &
  FieldControlContentVariantProps;

/** The control + helper-text column of `InputField`. */
export function FieldControlContent({ orientation, render, ...props }: FieldControlContentProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: fieldControlContentVariants({ orientation }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
