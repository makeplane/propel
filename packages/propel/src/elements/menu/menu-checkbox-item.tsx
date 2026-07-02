import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menuCheckboxItemVariants } from "./variants";

export type MenuCheckboxItemProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * A styled toggleable multi-select menu row. Base-UI-agnostic — graft the checkbox-item behavior in
 * `components` via `<BaseMenu.CheckboxItem render={<MenuCheckboxItem />} />` (Base UI applies
 * `role="menuitemcheckbox"` and the checked state).
 */
export function MenuCheckboxItem({ render, ...props }: MenuCheckboxItemProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: menuCheckboxItemVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
