import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { toolbarMenuTriggerIndicatorVariants } from "./variants";

export type ToolbarMenuTriggerIndicatorProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The disclosure caret slot at the inline-end of a toolbar menu trigger. A styled, `aria-hidden`
 * `<span>` that sizes its single child (e.g. a Lucide `ChevronDown`) to the trigger's `--node-size`
 * and tints it. Decorative (the trigger button carries the a11y state), so it is `aria-hidden`.
 * Base-UI-agnostic.
 */
export function ToolbarMenuTriggerIndicator({
  render,
  ...props
}: ToolbarMenuTriggerIndicatorProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: toolbarMenuTriggerIndicatorVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
