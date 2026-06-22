import { Menu as BaseMenu } from "@base-ui/react/menu";

import { menuGroupLabelVariants } from "./variants";

export type MenuGroupLabelProps = Omit<BaseMenu.GroupLabel.Props, "className" | "style">;

/** A non-interactive heading associated with its parent group. Wraps `Menu.GroupLabel` 1:1. */
export function MenuGroupLabel(props: MenuGroupLabelProps) {
  return <BaseMenu.GroupLabel className={menuGroupLabelVariants()} {...props} />;
}
