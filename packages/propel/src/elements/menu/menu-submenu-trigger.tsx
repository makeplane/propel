import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menuSubmenuTriggerVariants } from "./variants";

export type MenuSubmenuTriggerProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled row that opens a submenu. Base-UI-agnostic — graft the submenu-trigger behavior in
 * `components` via `<BaseMenu.SubmenuTrigger render={<MenuSubmenuTrigger />} />`.
 */
export function MenuSubmenuTrigger({ render, ...props }: MenuSubmenuTriggerProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: menuSubmenuTriggerVariants(),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
