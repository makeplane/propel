import { Menu as BaseMenu } from "@base-ui/react/menu";
import type * as React from "react";

import { menuGroupLabelVariants } from "./variants";

export type MenuGroupLabelProps = Omit<
  React.ComponentProps<typeof BaseMenu.GroupLabel>,
  "className" | "style"
>;

/** A non-interactive heading associated with its parent group. Wraps `Menu.GroupLabel` 1:1. */
export function MenuGroupLabel(props: MenuGroupLabelProps) {
  return <BaseMenu.GroupLabel className={menuGroupLabelVariants()} {...props} />;
}
