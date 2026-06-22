import { Menu as BaseMenu } from "@base-ui/react/menu";
import type * as React from "react";

type BaseSubmenuRootProps = BaseMenu.SubmenuRoot.Props;

export type MenuSubProps = Omit<
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

export function MenuSub(props: MenuSubProps) {
  return <BaseMenu.SubmenuRoot {...props} />;
}
