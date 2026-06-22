import type * as React from "react";

import { NodeSlot } from "../../internal/node-slot";
import {
  ContextMenuLinkItem as ContextMenuLinkItemRoot,
  type ContextMenuLinkItemProps as ContextMenuLinkItemRootProps,
} from "../../ui/context-menu";

export type ContextMenuLinkItemProps = Omit<ContextMenuLinkItemRootProps, "label"> & {
  /** Leading content before the label. */
  inlineStartNode?: React.ReactNode;
  /** The primary text of the row. */
  label?: React.ReactNode;
  /** Trailing content after the label. */
  inlineEndNode?: React.ReactNode;
};

/**
 * The ready-made navigational menu row: composes the atomic `ContextMenuLinkItem` and lays out
 * optional leading and trailing content slots around the label.
 */
export function ContextMenuLinkItem({
  inlineStartNode,
  label,
  inlineEndNode,
  children,
  ...props
}: ContextMenuLinkItemProps) {
  return (
    <ContextMenuLinkItemRoot {...props}>
      {inlineStartNode != null ? <NodeSlot>{inlineStartNode}</NodeSlot> : null}
      <span className="min-w-0 flex-1 truncate">{label ?? children}</span>
      {inlineEndNode != null ? <NodeSlot>{inlineEndNode}</NodeSlot> : null}
    </ContextMenuLinkItemRoot>
  );
}
