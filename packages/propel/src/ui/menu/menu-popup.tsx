import { Menu as BaseMenu } from "@base-ui/react/menu";
import type * as React from "react";

import { menuPopupVariants } from "./variants";

export type MenuPopupProps = Omit<
  React.ComponentProps<typeof BaseMenu.Popup>,
  "className" | "style"
>;

/** The menu surface that contains the items. Wraps `Menu.Popup` 1:1. */
export function MenuPopup(props: MenuPopupProps) {
  return <BaseMenu.Popup className={menuPopupVariants()} {...props} />;
}
