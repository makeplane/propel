import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menuRowVariants } from "./variants";

export type MenuLinkItemProps = Omit<useRender.ComponentProps<"a">, "className" | "style">;

/**
 * A styled navigational `<a>` menu row. Base-UI-agnostic — graft the link-item behavior in
 * `components` via `<BaseMenu.LinkItem render={<MenuLinkItem />} />`.
 */
export function MenuLinkItem({ render, ...props }: MenuLinkItemProps) {
  const defaultProps: useRender.ElementProps<"a"> = {
    className: menuRowVariants({ layout: "default" }),
  };
  return useRender({ defaultTagName: "a", render, props: mergeProps(defaultProps, props) });
}
