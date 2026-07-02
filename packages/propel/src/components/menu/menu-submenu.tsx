import { Menu as BaseMenu } from "@base-ui/react/menu";
import type * as React from "react";

type BaseSubmenuRootProps = BaseMenu.SubmenuRoot.Props;

export type MenuSubmenuProps = Omit<
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

/**
 * The submenu Root — Base UI's `SubmenuRoot` context/state provider (renders no element of its
 * own). A behavior-only role, so it lives in `components` (rules 1a, 2).
 */
export function MenuSubmenu(props: MenuSubmenuProps) {
  return <BaseMenu.SubmenuRoot {...props} />;
}
