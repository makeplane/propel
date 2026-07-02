import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { collapsibleTriggerVariants } from "./variants";

export type CollapsibleTriggerProps = Omit<
  useRender.ComponentProps<"button">,
  "className" | "style"
>;

/**
 * The styled disclosure trigger button. Base-UI-agnostic — graft the collapsible behavior in
 * `components` via `<BaseCollapsible.Trigger render={<CollapsibleTrigger/>} />`, which sets
 * `aria-expanded`/`aria-controls` and reflects open state as `[data-panel-open]`.
 */
export function CollapsibleTrigger({ render, ...props }: CollapsibleTriggerProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    className: collapsibleTriggerVariants(),
  };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
