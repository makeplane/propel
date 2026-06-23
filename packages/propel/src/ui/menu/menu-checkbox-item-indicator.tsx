import { Menu as BaseMenu } from "@base-ui/react/menu";

import { menuItemIndicatorVariants } from "./variants";

export type MenuCheckboxItemIndicatorProps = Omit<
  BaseMenu.CheckboxItemIndicator.Props,
  "className" | "style"
>;

/** Shows whether the checkbox item is ticked. Wraps `Menu.CheckboxItemIndicator` 1:1. */
export function MenuCheckboxItemIndicator(props: MenuCheckboxItemIndicatorProps) {
  return <BaseMenu.CheckboxItemIndicator className={menuItemIndicatorVariants()} {...props} />;
}
