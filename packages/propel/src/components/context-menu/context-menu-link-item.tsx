import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import type * as React from "react";

import {
  ContextMenuItemLabel,
  ContextMenuLinkItem as ContextMenuLinkItemElement,
  type ContextMenuItemTone,
} from "../../elements/context-menu";

export type ContextMenuLinkItemProps = Omit<
  BaseContextMenu.LinkItem.Props,
  "children" | "className" | "label" | "style" | "render"
> & {
  /** Neutral rows use the standard text hierarchy; `danger` rows use the error palette. */
  tone: ContextMenuItemTone;
  /** Leading element before the label, e.g. `<Icon icon={ExternalLink} />`. */
  icon?: React.ReactNode;
  /** Primary row label. */
  label: string;
  /** Element rendered at the inline end of the row, e.g. `<Shortcut keys="⌘ K" />`. */
  endContent?: React.ReactElement;
};

/**
 * The ready-made navigational menu row: grafts Base UI's `LinkItem` behavior onto the styled
 * `ContextMenuLinkItem` and composes its region parts — a leading icon, the label, and optional end
 * content.
 */
export function ContextMenuLinkItem({
  tone,
  icon,
  endContent,
  label,
  ...props
}: ContextMenuLinkItemProps) {
  return (
    <BaseContextMenu.LinkItem {...props} render={<ContextMenuLinkItemElement tone={tone} />}>
      {icon}
      <ContextMenuItemLabel>{label}</ContextMenuItemLabel>
      {endContent}
    </BaseContextMenu.LinkItem>
  );
}
