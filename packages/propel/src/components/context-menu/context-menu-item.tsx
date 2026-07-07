import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { Check } from "lucide-react";
import type * as React from "react";

import {
  ContextMenuItemIndicator,
  ContextMenuItemLabel,
  ContextMenuItem as ContextMenuItemElement,
  type ContextMenuItemTone,
} from "../../elements/context-menu";

export type ContextMenuItemProps = Omit<
  BaseContextMenu.Item.Props,
  "children" | "className" | "label" | "style" | "render"
> & {
  /** Neutral rows use the standard text hierarchy; `danger` rows use the error palette. */
  tone: ContextMenuItemTone;
  /** Leading element before the label, e.g. `<Icon icon={Copy} />`. */
  icon?: React.ReactNode;
  /** Primary row label. */
  label: string;
  /** Element rendered at the inline end of the row, e.g. `<Shortcut keys="⌘ K" />`. */
  endContent?: React.ReactElement;
  /** Single-select selected state. */
  selected?: boolean;
};

/**
 * The ready-made menu row: grafts Base UI's `Item` behavior onto the styled `ContextMenuItem` and
 * composes its region parts — a leading icon, the label, optional end content, and a trailing check
 * for single-select selected state. Pass `tone="danger"` for destructive actions.
 */
export function ContextMenuItem({
  tone,
  icon,
  endContent,
  selected,
  label,
  ...props
}: ContextMenuItemProps) {
  return (
    <BaseContextMenu.Item {...props} render={<ContextMenuItemElement tone={tone} />}>
      {icon}
      <ContextMenuItemLabel>{label}</ContextMenuItemLabel>
      {endContent}
      {selected ? (
        <ContextMenuItemIndicator data-selected="">
          <Check />
        </ContextMenuItemIndicator>
      ) : null}
    </BaseContextMenu.Item>
  );
}
