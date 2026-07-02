import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { Check } from "lucide-react";
import type * as React from "react";

import {
  ContextMenuCheckboxItem as ContextMenuCheckboxItemElement,
  ContextMenuCheckboxItemIndicator,
  ContextMenuItemLabel,
  ContextMenuItemShortcut,
  type ContextMenuItemTone,
} from "../../elements/context-menu";
import { Icon } from "../../internal/icon";

export type ContextMenuCheckboxItemProps = Omit<
  BaseContextMenu.CheckboxItem.Props,
  "className" | "style"
> & {
  /** Neutral rows use the standard text hierarchy; `danger` rows use the error palette. */
  tone: ContextMenuItemTone;
  /** Leading icon after the tick. */
  icon?: React.ReactNode;
  /** Trailing keyboard-shortcut hint after the label. */
  trailing?: React.ReactNode;
};

/**
 * The ready-made toggleable context-menu row: grafts Base UI's `CheckboxItem` behavior onto the
 * styled row and bakes a kept-mounted tick indicator, so `checked` / `defaultChecked` /
 * `onCheckedChange` forward straight to Base UI and the tick reads state from context.
 */
export function ContextMenuCheckboxItem({
  tone,
  icon,
  trailing,
  children,
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
      {icon != null ? <Icon>{icon}</Icon> : null}
      <ContextMenuItemLabel>{children}</ContextMenuItemLabel>
      {trailing != null ? <ContextMenuItemShortcut>{trailing}</ContextMenuItemShortcut> : null}
    </BaseContextMenu.CheckboxItem>
  );
}
