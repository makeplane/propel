import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menuGroupLabelVariants } from "./variants";

export type MenuGroupLabelProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * A styled non-interactive heading for a group of menu items. Base-UI-agnostic — graft the
 * group-label behavior in `components` via `<BaseMenu.GroupLabel render={<MenuGroupLabel />} />`.
 */
export function MenuGroupLabel({ render, ...props }: MenuGroupLabelProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: menuGroupLabelVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
