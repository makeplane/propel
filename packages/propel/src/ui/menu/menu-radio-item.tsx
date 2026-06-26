import { Menu as BaseMenu } from "@base-ui/react/menu";

import { menuRowVariants } from "./variants";

export type MenuRadioItemProps = Omit<BaseMenu.RadioItem.Props, "className" | "style">;

/** A menu row that behaves like a radio button. Wraps `Menu.RadioItem` 1:1. */
export function MenuRadioItem(props: MenuRadioItemProps) {
  return <BaseMenu.RadioItem className={menuRowVariants({ layout: "default" })} {...props} />;
}
