import type * as React from "react";

import { NodeSlot } from "../../internal/node-slot";
import {
  MenuLinkItem as MenuLinkItemRoot,
  type MenuLinkItemProps as MenuLinkItemRootProps,
} from "../../ui/menu";

export type MenuLinkItemProps = MenuLinkItemRootProps & {
  /** Leading content before the label. */
  inlineStartNode?: React.ReactNode;
  /** The primary text of the row. */
  label?: React.ReactNode;
  /** Trailing content after the label. */
  inlineEndNode?: React.ReactNode;
};

/**
 * The ready-made navigational `<a>` menu row: composes the atomic `MenuLinkItem` and lays out
 * optional leading/trailing nodes and the label.
 */
export function MenuLinkItem({
  inlineStartNode,
  label,
  inlineEndNode,
  children,
  ...props
}: MenuLinkItemProps) {
  return (
    <MenuLinkItemRoot {...props}>
      {inlineStartNode != null ? <NodeSlot>{inlineStartNode}</NodeSlot> : null}
      <span className="min-w-0 flex-1 truncate">{label ?? children}</span>
      {inlineEndNode != null ? <NodeSlot>{inlineEndNode}</NodeSlot> : null}
    </MenuLinkItemRoot>
  );
}
