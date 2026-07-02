import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { collapsibleTriggerTitleVariants } from "./variants";

export type CollapsibleTriggerTitleProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The trigger's label. Grows to fill the trigger row so a trailing `CollapsibleTriggerIndicator`
 * sits at the inline-end edge.
 */
export function CollapsibleTriggerTitle({ render, ...props }: CollapsibleTriggerTitleProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: collapsibleTriggerTitleVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
