import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import type * as React from "react";

import {
  ContextMenuItemIcon,
  ContextMenuItemLabel,
  ContextMenuLinkItem as ContextMenuLinkItemElement,
  type ContextMenuItemTone,
  ContextMenuItemShortcut,
} from "../../elements/context-menu";

export type ContextMenuLinkItemProps = Omit<
  BaseContextMenu.LinkItem.Props,
  "className" | "style" | "render"
> & {
  /** Neutral rows use the standard text hierarchy; `danger` rows use the error palette. */
  tone: ContextMenuItemTone;
  /** Leading icon before the label. */
  icon?: React.ReactNode;
  /** Trailing hint after the label. */
  trailing?: React.ReactNode;
};

/**
 * The ready-made navigational menu row: grafts Base UI's `LinkItem` behavior onto the styled
 * `ContextMenuLinkItem` and composes its region parts — a leading icon, the label, and an optional
 * trailing hint.
 */
export function ContextMenuLinkItem({
  tone,
  icon,
  trailing,
  children,
  ...props
}: ContextMenuLinkItemProps) {
  return (
    <BaseContextMenu.LinkItem {...props} render={<ContextMenuLinkItemElement tone={tone} />}>
      {icon != null ? <ContextMenuItemIcon>{icon}</ContextMenuItemIcon> : null}
      <ContextMenuItemLabel>{children}</ContextMenuItemLabel>
      {trailing != null ? <ContextMenuItemShortcut>{trailing}</ContextMenuItemShortcut> : null}
    </BaseContextMenu.LinkItem>
  );
}
