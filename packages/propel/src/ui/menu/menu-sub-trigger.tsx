import { Menu as BaseMenu } from "@base-ui/react/menu";

import { menuSubTriggerVariants } from "./variants";

export type MenuSubTriggerProps = Omit<
  BaseMenu.SubmenuTrigger.Props,
  "className" | "style" | "label"
>;

/** The row that opens a submenu. Wraps `Menu.SubmenuTrigger` 1:1. */
export function MenuSubTrigger(props: MenuSubTriggerProps) {
  return <BaseMenu.SubmenuTrigger className={menuSubTriggerVariants()} {...props} />;
}
