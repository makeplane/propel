import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { contextMenuSubmenuTriggerIndicatorVariants } from "./variants";

export type ContextMenuSubmenuTriggerIndicatorProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The submenu caret region at a `ContextMenuSubmenuTrigger`'s inline-end. Renders whatever icon you
 * pass (sized to the row's `--node-size`), tinted tertiary and mirrored under RTL so it always
 * points toward the submenu. Decorative (the trigger carries the a11y state), so it is
 * `aria-hidden`. Base-UI-agnostic.
 */
export function ContextMenuSubmenuTriggerIndicator({
  render,
  ...props
}: ContextMenuSubmenuTriggerIndicatorProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: contextMenuSubmenuTriggerIndicatorVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
