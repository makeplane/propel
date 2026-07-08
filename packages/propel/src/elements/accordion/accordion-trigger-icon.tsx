import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { accordionTriggerIconVariants } from "./variants";

export type AccordionTriggerIconProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The trigger's leading icon slot, sized independently of the row's default `--node-size`.
 * Base-UI-agnostic — composed directly in `components` around the consumer-supplied `icon`.
 */
export function AccordionTriggerIcon({ render, ...props }: AccordionTriggerIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: accordionTriggerIconVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
