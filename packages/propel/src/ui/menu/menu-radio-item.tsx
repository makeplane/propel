import { Menu as BaseMenu } from "@base-ui/react/menu";
import type * as React from "react";

import { menuItemVariants } from "./variants";

export type MenuRadioItemProps = Omit<
  React.ComponentProps<typeof BaseMenu.RadioItem>,
  "className" | "style"
>;

/** A menu row that behaves like a radio button. Wraps `Menu.RadioItem` 1:1. */
export function MenuRadioItem(props: MenuRadioItemProps) {
  return <BaseMenu.RadioItem className={menuItemVariants()} {...props} />;
}
