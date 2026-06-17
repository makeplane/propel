import { Menu } from "@base-ui/react/menu";
import type * as React from "react";

type BaseSubmenuRootProps = React.ComponentProps<typeof Menu.SubmenuRoot>;

export type DropdownSubProps = Omit<
  BaseSubmenuRootProps,
  "open" | "defaultOpen" | "onOpenChange" | "children"
> & {
  /** Whether the submenu is open. Controlled; pair with `onOpenChange`. */
  open?: boolean;
  /** Whether the submenu is open on mount. Uncontrolled. @default false */
  defaultOpen?: boolean;
  /** Called with the next open state when the submenu opens or closes. */
  onOpenChange?: BaseSubmenuRootProps["onOpenChange"];
  /** The submenu's trigger and nested content. */
  children?: React.ReactNode;
};

export function DropdownSub(props: DropdownSubProps) {
  return <Menu.SubmenuRoot {...props} />;
}
