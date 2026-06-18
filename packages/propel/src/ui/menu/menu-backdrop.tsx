import { Menu as BaseMenu } from "@base-ui/react/menu";
import type * as React from "react";

export type MenuBackdropProps = Omit<
  React.ComponentProps<typeof BaseMenu.Backdrop>,
  "className" | "style"
>;

/** An overlay rendered beneath the menu popup. Wraps `Menu.Backdrop` 1:1. */
export function MenuBackdrop(props: MenuBackdropProps) {
  return <BaseMenu.Backdrop {...props} />;
}
