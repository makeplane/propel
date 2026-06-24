import { Check } from "lucide-react";
import type * as React from "react";

import {
  ContextMenuItemIcon,
  ContextMenuItemIndicator,
  ContextMenuItemLabel,
  ContextMenuItem as ContextMenuItemElement,
  type ContextMenuItemProps as ContextMenuItemElementProps,
  ContextMenuItemShortcut,
} from "../../ui/context-menu";

export type ContextMenuItemProps = ContextMenuItemElementProps & {
  /** Leading icon before the label. */
  inlineStartNode?: React.ReactNode;
  /** Trailing keyboard-shortcut hint after the label. */
  inlineEndNode?: React.ReactNode;
  /** Single-select selected state. */
  selected?: boolean;
};

/**
 * The ready-made menu row: composes the atomic `ContextMenuItem` and its region parts — a leading
 * icon, the label, an optional trailing shortcut hint, and a trailing check for single-select
 * selected state. Pass `tone="danger"` for destructive actions.
 */
export function ContextMenuItem({
  inlineStartNode,
  inlineEndNode,
  selected,
  children,
  ...props
}: ContextMenuItemProps) {
  return (
    <ContextMenuItemElement {...props}>
      {inlineStartNode != null ? (
        <ContextMenuItemIcon>{inlineStartNode}</ContextMenuItemIcon>
      ) : null}
      <ContextMenuItemLabel>{children}</ContextMenuItemLabel>
      {inlineEndNode != null ? (
        <ContextMenuItemShortcut>{inlineEndNode}</ContextMenuItemShortcut>
      ) : null}
      {selected ? (
        <ContextMenuItemIndicator>
          <Check />
        </ContextMenuItemIndicator>
      ) : null}
    </ContextMenuItemElement>
  );
}
