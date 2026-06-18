import { Menu as BaseMenu } from "@base-ui/react/menu";
import type * as React from "react";

export type MenuSeparatorProps = Omit<
  React.ComponentProps<typeof BaseMenu.Separator>,
  "className" | "style"
>;

/** A thin divider between groups of items. */
export function MenuSeparator(props: MenuSeparatorProps) {
  return <BaseMenu.Separator className="-mx-1 my-1 border-t border-subtle" {...props} />;
}
