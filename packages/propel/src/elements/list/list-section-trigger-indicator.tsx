import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { listSectionTriggerIndicatorVariants } from "./variants";

export type ListSectionTriggerIndicatorProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The disclosure caret slot at a `ListSectionTrigger`'s inline-end. Renders whatever svg you pass
 * (sized to the trigger's `--node-size`) pointing toward the inline-end while collapsed, rotating
 * down when the panel opens — the same motion as the accordion trigger. Decorative — the trigger
 * carries the a11y state — so it is `aria-hidden`.
 */
export function ListSectionTriggerIndicator({
  render,
  ...props
}: ListSectionTriggerIndicatorProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: listSectionTriggerIndicatorVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
