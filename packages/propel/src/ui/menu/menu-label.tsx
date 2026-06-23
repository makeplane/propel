import { Menu as BaseMenu } from "@base-ui/react/menu";

import { menuLabelVariants } from "./variants";

export type MenuLabelProps = Omit<BaseMenu.GroupLabel.Props, "className" | "style">;

/** A non-interactive section heading for a group of menu items. Wraps `Menu.GroupLabel` 1:1. */
export function MenuLabel(props: MenuLabelProps) {
  return <BaseMenu.GroupLabel className={menuLabelVariants()} {...props} />;
}
