import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { collapsibleTriggerIndicatorVariants } from "./variants";

export type CollapsibleTriggerIndicatorProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The disclosure caret slot at the trigger's inline-end. Renders whatever svg you pass (sized to
 * the trigger's `--node-size`), pointing inline-end while collapsed and down while the panel is
 * open (pass a chevron-down). Decorative — the trigger carries the a11y state — so it is
 * `aria-hidden`.
 */
export function CollapsibleTriggerIndicator({
  render,
  ...props
}: CollapsibleTriggerIndicatorProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: collapsibleTriggerIndicatorVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
