import { Menu } from "@base-ui/react/menu";
import type * as React from "react";

export type DropdownGroupProps = Omit<
  React.ComponentProps<typeof Menu.Group>,
  "className" | "style"
>;

/** Groups related menu items so a `DropdownLabel` can title them. */
export function DropdownGroup(props: DropdownGroupProps) {
  return <Menu.Group {...props} />;
}
