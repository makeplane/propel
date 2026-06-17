import { Menu } from "@base-ui/react/menu";
import type * as React from "react";

export type DropdownSeparatorProps = Omit<
  React.ComponentProps<typeof Menu.Separator>,
  "className" | "style"
>;

/** A thin divider between groups of items. */
export function DropdownSeparator(props: DropdownSeparatorProps) {
  return <Menu.Separator className="-mx-1 my-1 border-t border-subtle" {...props} />;
}
