import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menuSubmenuTriggerIndicatorVariants } from "./variants";

export type MenuItemSubmenuIndicatorProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The chevron slot marking a submenu trigger, pinned at the row's inline-end and mirrored under
 * RTL. Decorative (the trigger carries `aria-haspopup`), so it is `aria-hidden`. Renders and sizes
 * its single child; pass the glyph as `children`.
 */
export function MenuSubmenuTriggerIndicator({ render, ...props }: MenuItemSubmenuIndicatorProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: menuSubmenuTriggerIndicatorVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
