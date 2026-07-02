import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { collapsiblePanelContentVariants } from "./variants";

export type CollapsiblePanelContentProps = Omit<
  useRender.ComponentProps<"div">,
  "className" | "style"
>;

/**
 * The padded inner content of a `CollapsiblePanel`. The padding lives here rather than on the panel
 * itself, because the panel animates its height open/closed and padding there would offset the
 * measured height.
 */
export function CollapsiblePanelContent({ render, ...props }: CollapsiblePanelContentProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: collapsiblePanelContentVariants(),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
