import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { Circle } from "lucide-react";
import type * as React from "react";

import {
  ContextMenuItemLabel,
  type ContextMenuItemTone,
  ContextMenuRadioItem as ContextMenuRadioItemElement,
  ContextMenuRadioItemIndicator,
} from "../../elements/context-menu";

export type ContextMenuRadioItemProps = Omit<
  BaseContextMenu.RadioItem.Props,
  "children" | "className" | "label" | "style"
> & {
  /** Neutral rows use the standard text hierarchy; `danger` rows use the error palette. */
  tone: ContextMenuItemTone;
  /** Leading element after the radio dot, e.g. `<Icon icon={AlignLeft} />`. */
  icon?: React.ReactNode;
  /** Primary row label. */
  label: string;
  /** Element rendered at the inline end of the row, e.g. `<Shortcut keys="⌘ K" />`. */
  endContent?: React.ReactElement;
};

/**
 * The ready-made single-select context-menu row: grafts Base UI's `RadioItem` behavior onto the
 * styled row and bakes a kept-mounted radio dot. Wrap rows in a `ContextMenuRadioGroup` carrying
 * `value`/`onValueChange`; the dot reads the selected state from context.
 */
export function ContextMenuRadioItem({
  tone,
  icon,
  endContent,
  label,
  ...props
}: ContextMenuRadioItemProps) {
  return (
    <BaseContextMenu.RadioItem {...props} render={<ContextMenuRadioItemElement tone={tone} />}>
      <BaseContextMenu.RadioItemIndicator keepMounted render={<ContextMenuRadioItemIndicator />}>
        <Circle aria-hidden />
      </BaseContextMenu.RadioItemIndicator>
      {icon}
      <ContextMenuItemLabel>{label}</ContextMenuItemLabel>
      {endContent}
    </BaseContextMenu.RadioItem>
  );
}
