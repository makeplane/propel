import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menuLabelVariants } from "./variants";

export type MenuLabelProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * A styled non-interactive section heading row that can carry inline-end metadata. Base-UI-agnostic
 * — graft the group-label behavior in `components` via `<BaseMenu.GroupLabel render={<MenuLabel />}
 * />`.
 */
export function MenuLabel({ render, ...props }: MenuLabelProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: menuLabelVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
