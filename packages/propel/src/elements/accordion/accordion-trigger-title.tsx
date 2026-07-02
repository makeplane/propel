import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { accordionTriggerTitleVariants } from "./variants";

export type AccordionTriggerTitleProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The trigger's label. Grows to fill the trigger row so a trailing `AccordionTriggerIndicator` sits
 * at the inline-end edge.
 */
export function AccordionTriggerTitle({ render, ...props }: AccordionTriggerTitleProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: accordionTriggerTitleVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
