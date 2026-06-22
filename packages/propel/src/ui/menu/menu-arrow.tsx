import { Menu as BaseMenu } from "@base-ui/react/menu";

import { menuArrowVariants } from "./variants";

export type MenuArrowProps = Omit<BaseMenu.Arrow.Props, "className" | "style">;

/** An element pointing from the popup toward its anchor. Wraps `Menu.Arrow` 1:1. */
export function MenuArrow(props: MenuArrowProps) {
  return <BaseMenu.Arrow className={menuArrowVariants()} {...props} />;
}
