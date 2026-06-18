import { Menu as BaseMenu } from "@base-ui/react/menu";
import type * as React from "react";

export type MenuGroupProps = Omit<
  React.ComponentProps<typeof BaseMenu.Group>,
  "className" | "style"
>;

/** Groups related menu items so a `MenuLabel` can title them. */
export function MenuGroup(props: MenuGroupProps) {
  return <BaseMenu.Group {...props} />;
}
