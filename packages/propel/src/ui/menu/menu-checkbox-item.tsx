import { Menu as BaseMenu } from "@base-ui/react/menu";

import { menuCheckboxItemVariants } from "./variants";

export type MenuCheckboxItemProps = Omit<
  BaseMenu.CheckboxItem.Props,
  "className" | "style" | "label"
>;

/** A toggleable multi-select menu row with `role="menuitemcheckbox"`. Wraps `Menu.CheckboxItem` 1:1. */
export function MenuCheckboxItem(props: MenuCheckboxItemProps) {
  return <BaseMenu.CheckboxItem className={menuCheckboxItemVariants()} {...props} />;
}
