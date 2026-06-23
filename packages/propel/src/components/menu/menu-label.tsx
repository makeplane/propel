import type * as React from "react";

import {
  MenuLabel as MenuLabelRoot,
  MenuLabelMeta,
  type MenuLabelProps as MenuLabelRootProps,
  MenuLabelTitle,
} from "../../ui/menu";

export type MenuLabelProps = MenuLabelRootProps & {
  /** Optional inline-end content on the heading row. */
  inlineEndNode?: React.ReactNode;
  children?: React.ReactNode;
};

/** A non-interactive section heading for a group of menu items. */
export function MenuLabel({ inlineEndNode, children, ...props }: MenuLabelProps) {
  return (
    <MenuLabelRoot {...props}>
      <MenuLabelTitle>{children}</MenuLabelTitle>
      {inlineEndNode != null ? <MenuLabelMeta>{inlineEndNode}</MenuLabelMeta> : null}
    </MenuLabelRoot>
  );
}
