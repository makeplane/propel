import { Menu as BaseMenu } from "@base-ui/react/menu";

import { menuPositionerVariants } from "./variants";

export type MenuPositionerProps = Omit<BaseMenu.Positioner.Props, "className" | "style">;

/** Positions the popup against the pointer. Wraps `Menu.Positioner` 1:1. */
export function MenuPositioner(props: MenuPositionerProps) {
  return <BaseMenu.Positioner className={menuPositionerVariants()} {...props} />;
}
