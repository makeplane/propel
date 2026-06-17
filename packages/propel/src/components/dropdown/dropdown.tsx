import { Menu } from "@base-ui/react/menu";
import type * as React from "react";

type BaseMenuRootProps = React.ComponentProps<typeof Menu.Root>;

export type DropdownProps = Omit<
  BaseMenuRootProps,
  "open" | "defaultOpen" | "onOpenChange" | "modal" | "children"
> & {
  /** Whether the menu is open. Controlled; pair with `onOpenChange`. */
  open?: boolean;
  /** Whether the menu is open on mount. Uncontrolled. @default false */
  defaultOpen?: boolean;
  /** Called with the next open state when the menu opens or closes. */
  onOpenChange?: BaseMenuRootProps["onOpenChange"];
  /** Modal behavior while open. @default false */
  modal?: BaseMenuRootProps["modal"];
  /** The trigger and menu surface (`DropdownTrigger`, `DropdownContent`). */
  children?: React.ReactNode;
};

export function Dropdown(props: DropdownProps) {
  return <Menu.Root {...props} />;
}
