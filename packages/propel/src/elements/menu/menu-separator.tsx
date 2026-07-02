import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menuSeparatorVariants } from "./variants";

export type MenuSeparatorProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * A styled thin divider between groups of items. Base-UI-agnostic — graft the separator behavior in
 * `components` via `<BaseMenu.Separator render={<MenuSeparator />} />`.
 */
export function MenuSeparator({ render, ...props }: MenuSeparatorProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: menuSeparatorVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
