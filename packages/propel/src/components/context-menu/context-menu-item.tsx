import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { Check } from "lucide-react";
import type * as React from "react";

import {
  ContextMenuItemIcon,
  ContextMenuItemIndicator,
  ContextMenuItemLabel,
  ContextMenuItem as ContextMenuItemElement,
  type ContextMenuItemTone,
  ContextMenuItemShortcut,
} from "../../elements/context-menu";

export type ContextMenuItemProps = Omit<
  BaseContextMenu.Item.Props,
  "className" | "style" | "render"
> & {
  /** Neutral rows use the standard text hierarchy; `danger` rows use the error palette. */
  tone: ContextMenuItemTone;
  /** Leading icon before the label. */
  icon?: React.ReactNode;
  /** Trailing keyboard-shortcut hint after the label. */
  trailing?: React.ReactNode;
  /** Single-select selected state. */
  selected?: boolean;
};

/**
 * The ready-made menu row: grafts Base UI's `Item` behavior onto the styled `ContextMenuItem` and
 * composes its region parts — a leading icon, the label, an optional trailing shortcut hint, and a
 * trailing check for single-select selected state. Pass `tone="danger"` for destructive actions.
 */
export function ContextMenuItem({
  tone,
  icon,
  trailing,
  selected,
  children,
  ...props
}: ContextMenuItemProps) {
  return (
    <BaseContextMenu.Item {...props} render={<ContextMenuItemElement tone={tone} />}>
      {icon != null ? <ContextMenuItemIcon>{icon}</ContextMenuItemIcon> : null}
      <ContextMenuItemLabel>{children}</ContextMenuItemLabel>
      {trailing != null ? <ContextMenuItemShortcut>{trailing}</ContextMenuItemShortcut> : null}
      {selected ? (
        <ContextMenuItemIndicator>
          <Check />
        </ContextMenuItemIndicator>
      ) : null}
    </BaseContextMenu.Item>
  );
}
