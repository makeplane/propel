import type * as React from "react";

import {
  ContextMenuItemIcon,
  ContextMenuItemLabel,
  ContextMenuLinkItem as ContextMenuLinkItemElement,
  type ContextMenuLinkItemProps as ContextMenuLinkItemElementProps,
  ContextMenuItemShortcut,
} from "../../ui/context-menu";

export type ContextMenuLinkItemProps = Omit<ContextMenuLinkItemElementProps, "label"> & {
  /** Leading icon before the label. */
  inlineStartNode?: React.ReactNode;
  /** The primary text of the row. */
  label?: React.ReactNode;
  /** Trailing hint after the label. */
  inlineEndNode?: React.ReactNode;
};

/**
 * The ready-made navigational menu row: composes the atomic `ContextMenuLinkItem` and its region
 * parts — a leading icon, the label, and an optional trailing hint.
 */
export function ContextMenuLinkItem({
  inlineStartNode,
  label,
  inlineEndNode,
  children,
  ...props
}: ContextMenuLinkItemProps) {
  return (
    <ContextMenuLinkItemElement {...props}>
      {inlineStartNode != null ? (
        <ContextMenuItemIcon>{inlineStartNode}</ContextMenuItemIcon>
      ) : null}
      <ContextMenuItemLabel>{label ?? children}</ContextMenuItemLabel>
      {inlineEndNode != null ? (
        <ContextMenuItemShortcut>{inlineEndNode}</ContextMenuItemShortcut>
      ) : null}
    </ContextMenuLinkItemElement>
  );
}
