import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { Check } from "lucide-react";
import type * as React from "react";

import {
  ContextMenuCheckboxItem as ContextMenuCheckboxItemElement,
  ContextMenuCheckboxItemIndicator,
  ContextMenuItemLabel,
  type ContextMenuItemTone,
} from "../../elements/context-menu";

export type ContextMenuCheckboxItemProps = Omit<
  BaseContextMenu.CheckboxItem.Props,
  "children" | "className" | "label" | "style"
> & {
  /** Neutral rows use the standard text hierarchy; `danger` rows use the error palette. */
  tone: ContextMenuItemTone;
  /** Leading element after the tick, e.g. `<Icon icon={Columns} />`. */
  icon?: React.ReactNode;
  /** Primary row label. */
  label: string;
  /** Element rendered at the inline end of the row, e.g. `<Shortcut keys="⌘ K" />`. */
  endContent?: React.ReactElement;
};

/**
 * The ready-made toggleable context-menu row: grafts Base UI's `CheckboxItem` behavior onto the
 * styled row and bakes a kept-mounted tick indicator, so `checked` / `defaultChecked` /
 * `onCheckedChange` forward straight to Base UI and the tick reads state from context.
 */
export function ContextMenuCheckboxItem({
  tone,
  icon,
  endContent,
  label,
  ...props
}: ContextMenuCheckboxItemProps) {
  return (
    <BaseContextMenu.CheckboxItem
      {...props}
      render={<ContextMenuCheckboxItemElement tone={tone} />}
    >
      <BaseContextMenu.CheckboxItemIndicator
        keepMounted
        render={<ContextMenuCheckboxItemIndicator />}
      >
        <Check aria-hidden />
      </BaseContextMenu.CheckboxItemIndicator>
      {icon}
      <ContextMenuItemLabel>{label}</ContextMenuItemLabel>
      {endContent}
    </BaseContextMenu.CheckboxItem>
  );
}
