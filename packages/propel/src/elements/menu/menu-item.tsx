import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type MenuRowVariantProps, menuRowVariants } from "./variants";

export type MenuItemProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  MenuRowVariantProps;

/**
 * A styled selectable menu row. Base-UI-agnostic — graft the menu-item behavior in `components` via
 * `<BaseMenu.Item render={<MenuItem layout="…" />} />`.
 */
export function MenuItem({ layout, render, ...props }: MenuItemProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: menuRowVariants({ layout }) };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
