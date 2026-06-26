import { Menu as BaseMenu } from "@base-ui/react/menu";

import { type MenuPopupVariantProps, menuPopupVariants } from "./variants";

export type MenuPopupProps = Omit<BaseMenu.Popup.Props, "className" | "style"> &
  MenuPopupVariantProps;

/** The menu surface that contains the items. Wraps `Menu.Popup` 1:1. */
export function MenuPopup({ surface, ...props }: MenuPopupProps) {
  return <BaseMenu.Popup className={menuPopupVariants({ surface })} {...props} />;
}
