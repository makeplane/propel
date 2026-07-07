import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type MenuSubmenuTriggerVariantProps, menuSubmenuTriggerVariants } from "./variants";

export type MenuSubmenuTriggerProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  MenuSubmenuTriggerVariantProps;

/**
 * The styled row that opens a submenu. Base-UI-agnostic — graft the submenu-trigger behavior in
 * `components` via `<BaseMenu.SubmenuTrigger render={<MenuSubmenuTrigger />} />`.
 */
export function MenuSubmenuTrigger({ tone, render, ...props }: MenuSubmenuTriggerProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: menuSubmenuTriggerVariants({ tone }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
