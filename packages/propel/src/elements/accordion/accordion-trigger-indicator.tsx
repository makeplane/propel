import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { accordionTriggerIndicatorVariants } from "./variants";

export type AccordionTriggerIndicatorProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The disclosure caret slot at the trigger's inline-end. Renders whatever svg you pass (sized to
 * the trigger's `--node-size`) and rotates toward the inline-end while collapsed, to point down
 * when the panel opens. Decorative — the trigger carries the a11y state — so it is `aria-hidden`.
 */
export function AccordionTriggerIndicator({ render, ...props }: AccordionTriggerIndicatorProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: accordionTriggerIndicatorVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
