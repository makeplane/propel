import { Menu as BaseMenu } from "@base-ui/react/menu";

import { menuSeparatorVariants } from "./variants";

export type MenuSeparatorProps = Omit<BaseMenu.Separator.Props, "className" | "style">;

/** A thin divider between groups of items. */
export function MenuSeparator(props: MenuSeparatorProps) {
  return <BaseMenu.Separator className={menuSeparatorVariants()} {...props} />;
}
