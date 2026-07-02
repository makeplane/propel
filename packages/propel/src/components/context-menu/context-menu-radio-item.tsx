import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { Circle } from "lucide-react";
import type * as React from "react";

import {
  ContextMenuItemLabel,
  ContextMenuItemShortcut,
  type ContextMenuItemTone,
  ContextMenuRadioItem as ContextMenuRadioItemElement,
  ContextMenuRadioItemIndicator,
} from "../../elements/context-menu";
import { Icon } from "../../internal/icon";

export type ContextMenuRadioItemProps = Omit<
  BaseContextMenu.RadioItem.Props,
  "className" | "style"
> & {
  /** Neutral rows use the standard text hierarchy; `danger` rows use the error palette. */
  tone: ContextMenuItemTone;
  /** Leading icon after the radio dot. */
  icon?: React.ReactNode;
  /** Trailing keyboard-shortcut hint after the label. */
  trailing?: React.ReactNode;
};

/**
 * The ready-made single-select context-menu row: grafts Base UI's `RadioItem` behavior onto the
 * styled row and bakes a kept-mounted radio dot. Wrap rows in a `ContextMenuRadioGroup` carrying
 * `value`/`onValueChange`; the dot reads the selected state from context.
 */
export function ContextMenuRadioItem({
  tone,
  icon,
  trailing,
  children,
  ...props
}: ContextMenuRadioItemProps) {
  return (
    <BaseContextMenu.RadioItem {...props} render={<ContextMenuRadioItemElement tone={tone} />}>
      <BaseContextMenu.RadioItemIndicator keepMounted render={<ContextMenuRadioItemIndicator />}>
        <Circle aria-hidden />
      </BaseContextMenu.RadioItemIndicator>
      {icon != null ? <Icon>{icon}</Icon> : null}
      <ContextMenuItemLabel>{children}</ContextMenuItemLabel>
      {trailing != null ? <ContextMenuItemShortcut>{trailing}</ContextMenuItemShortcut> : null}
    </BaseContextMenu.RadioItem>
  );
}
