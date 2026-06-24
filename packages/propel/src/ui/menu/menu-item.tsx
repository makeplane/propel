import { Menu as BaseMenu } from "@base-ui/react/menu";

import { type MenuRowVariantProps, menuRowVariants } from "./variants";

export type { MenuRowVariantProps } from "./variants";

export type MenuItemProps = Omit<BaseMenu.Item.Props, "className" | "style"> &
  MenuRowVariantProps;

/** A selectable menu row. Wraps `Menu.Item` 1:1. */
export function MenuItem({ variant, emphasis, ...props }: MenuItemProps) {
  return <BaseMenu.Item className={menuRowVariants({ variant, emphasis })} {...props} />;
}
