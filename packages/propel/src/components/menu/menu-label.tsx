import { Menu as BaseMenu } from "@base-ui/react/menu";
import type * as React from "react";

import { MenuLabel as MenuLabelElement, MenuLabelMeta, MenuLabelTitle } from "../../elements/menu";

export type MenuLabelProps = Omit<BaseMenu.GroupLabel.Props, "className" | "style"> & {
  /** Optional inline-end content on the heading row. */
  meta?: React.ReactNode;
  children?: React.ReactNode;
};

/**
 * A non-interactive section heading for a group of menu items: grafts Base UI's `Menu.GroupLabel`
 * behavior onto the styled `MenuLabel`.
 */
export function MenuLabel({ meta, children, ...props }: MenuLabelProps) {
  return (
    <BaseMenu.GroupLabel {...props} render={<MenuLabelElement />}>
      <MenuLabelTitle>{children}</MenuLabelTitle>
      {meta != null ? <MenuLabelMeta>{meta}</MenuLabelMeta> : null}
    </BaseMenu.GroupLabel>
  );
}
