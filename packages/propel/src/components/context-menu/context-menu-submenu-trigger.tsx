import { ChevronRight } from "lucide-react";
import type * as React from "react";

import {
  ContextMenuItemIcon,
  ContextMenuItemLabel,
  ContextMenuItemShortcut,
  ContextMenuSubmenuTrigger as ContextMenuSubmenuTriggerElement,
  type ContextMenuSubmenuTriggerProps as ContextMenuSubmenuTriggerElementProps,
  ContextMenuSubmenuTriggerIndicator,
} from "../../ui/context-menu";

export type ContextMenuSubmenuTriggerProps = Omit<
  ContextMenuSubmenuTriggerElementProps,
  "label"
> & {
  /** Leading icon before the label. */
  inlineStartNode?: React.ReactNode;
  /** The primary text of the row. */
  label?: React.ReactNode;
  /** Trailing hint before the submenu caret. */
  inlineEndNode?: React.ReactNode;
};

/**
 * The ready-made submenu trigger: composes the atomic `ContextMenuSubmenuTrigger` and its region
 * parts — a leading icon, the label, an optional trailing hint, and the caret that points toward
 * the submenu.
 */
export function ContextMenuSubmenuTrigger({
  inlineStartNode,
  label,
  inlineEndNode,
  children,
  ...props
}: ContextMenuSubmenuTriggerProps) {
  return (
    <ContextMenuSubmenuTriggerElement {...props}>
      {inlineStartNode != null ? (
        <ContextMenuItemIcon>{inlineStartNode}</ContextMenuItemIcon>
      ) : null}
      <ContextMenuItemLabel>{label ?? children}</ContextMenuItemLabel>
      {inlineEndNode != null ? (
        <ContextMenuItemShortcut>{inlineEndNode}</ContextMenuItemShortcut>
      ) : null}
      <ContextMenuSubmenuTriggerIndicator>
        <ChevronRight />
      </ContextMenuSubmenuTriggerIndicator>
    </ContextMenuSubmenuTriggerElement>
  );
}
