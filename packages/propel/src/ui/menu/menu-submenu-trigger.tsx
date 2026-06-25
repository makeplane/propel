import { Menu as BaseMenu } from "@base-ui/react/menu";

import { menuSubmenuTriggerVariants } from "./variants";

export type MenuSubmenuTriggerProps = Omit<
  BaseMenu.SubmenuTrigger.Props,
  "className" | "style" | "label"
>;

/** The row that opens a submenu. Wraps `Menu.SubmenuTrigger` 1:1. */
export function MenuSubmenuTrigger(props: MenuSubmenuTriggerProps) {
  return <BaseMenu.SubmenuTrigger className={menuSubmenuTriggerVariants()} {...props} />;
}
