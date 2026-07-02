import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menuItemSubmenuIndicatorVariants } from "./variants";

export type MenuItemSubmenuIndicatorProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The chevron slot marking a submenu trigger, pinned at the row's inline-end and mirrored under
 * RTL. Decorative (the trigger carries `aria-haspopup`), so it is `aria-hidden`. Renders and sizes
 * its single child; pass the glyph as `children`.
 */
export function MenuItemSubmenuIndicator({ render, ...props }: MenuItemSubmenuIndicatorProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: menuItemSubmenuIndicatorVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
