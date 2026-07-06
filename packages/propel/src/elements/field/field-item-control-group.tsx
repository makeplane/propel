import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { fieldItemControlGroupVariants } from "./variants";

export type FieldItemControlGroupProps = Omit<
  useRender.ComponentProps<"div">,
  "className" | "style"
>;

/**
 * The control slot of a choice option row (checkbox/radio/switch): a 20px-tall box matching the
 * label's first line box, so the wrapped control centers on that line even when the label wraps or
 * a description follows.
 */
export function FieldItemControlGroup({ render, ...props }: FieldItemControlGroupProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: fieldItemControlGroupVariants(),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
