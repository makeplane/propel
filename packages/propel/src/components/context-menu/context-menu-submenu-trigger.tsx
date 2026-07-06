import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { ChevronDown } from "lucide-react";
import type * as React from "react";

import {
  ContextMenuItemLabel,
  ContextMenuItemShortcut,
  ContextMenuSubmenuTrigger as ContextMenuSubmenuTriggerElement,
  type ContextMenuSubmenuTriggerTone,
} from "../../elements/context-menu";
import { DisclosureIndicator } from "../../internal/disclosure-indicator";

export type ContextMenuSubmenuTriggerProps = Omit<
  BaseContextMenu.SubmenuTrigger.Props,
  "children" | "className" | "label" | "style" | "render"
> & {
  /** Neutral rows use the standard text hierarchy; `danger` rows use the error palette. */
  tone: ContextMenuSubmenuTriggerTone;
  /** Leading element before the label, e.g. `<Icon icon={Folder} />`. */
  icon?: React.ReactNode;
  /** Primary row label. */
  label: React.ReactNode;
  /** Element rendered before the submenu caret at the inline end of the row. */
  endContent?: React.ReactNode;
};

/**
 * The ready-made submenu trigger: grafts Base UI's `SubmenuTrigger` behavior onto the styled
 * `ContextMenuSubmenuTrigger` and composes its region parts — a leading icon, the label, an
 * optional end content, and the caret that points toward the submenu.
 */
export function ContextMenuSubmenuTrigger({
  tone,
  icon,
  endContent,
  label,
  ...props
}: ContextMenuSubmenuTriggerProps) {
  return (
    <BaseContextMenu.SubmenuTrigger
      {...props}
      render={<ContextMenuSubmenuTriggerElement tone={tone} />}
    >
      {icon}
      <ContextMenuItemLabel>{label}</ContextMenuItemLabel>
      {endContent != null ? <ContextMenuItemShortcut>{endContent}</ContextMenuItemShortcut> : null}
      <DisclosureIndicator motion="pointEnd" tint="tertiary" magnitude="inherit">
        <ChevronDown />
      </DisclosureIndicator>
    </BaseContextMenu.SubmenuTrigger>
  );
}
