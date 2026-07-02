import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { accordionPanelContentVariants } from "./variants";

export type AccordionPanelContentProps = Omit<
  useRender.ComponentProps<"div">,
  "className" | "style"
>;

/**
 * The padded inner content of an `AccordionPanel`. The padding lives here rather than on the panel
 * itself, because the panel animates its height open/closed and padding there would offset the
 * measured height.
 */
export function AccordionPanelContent({ render, ...props }: AccordionPanelContentProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: accordionPanelContentVariants(),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
