import { Menu as BaseMenu } from "@base-ui/react/menu";

import { menuPopupVariants } from "./variants";

export type MenuPopupProps = Omit<BaseMenu.Popup.Props, "className" | "style">;

/** The menu surface that contains the items. Wraps `Menu.Popup` 1:1. */
export function MenuPopup(props: MenuPopupProps) {
  return <BaseMenu.Popup className={menuPopupVariants()} {...props} />;
}
