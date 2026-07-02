import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { ChevronRight } from "lucide-react";
import type * as React from "react";

import {
  ContextMenuItemIcon,
  ContextMenuItemLabel,
  ContextMenuItemShortcut,
  ContextMenuSubmenuTrigger as ContextMenuSubmenuTriggerElement,
  type ContextMenuSubmenuTriggerTone,
  ContextMenuSubmenuTriggerIndicator,
} from "../../elements/context-menu";

export type ContextMenuSubmenuTriggerProps = Omit<
  BaseContextMenu.SubmenuTrigger.Props,
  "className" | "style" | "render"
> & {
  /** Neutral rows use the standard text hierarchy; `danger` rows use the error palette. */
  tone: ContextMenuSubmenuTriggerTone;
  /** Leading icon before the label. */
  icon?: React.ReactNode;
  /** Trailing hint before the submenu caret. */
  trailing?: React.ReactNode;
};

/**
 * The ready-made submenu trigger: grafts Base UI's `SubmenuTrigger` behavior onto the styled
 * `ContextMenuSubmenuTrigger` and composes its region parts — a leading icon, the label, an
 * optional trailing hint, and the caret that points toward the submenu.
 */
export function ContextMenuSubmenuTrigger({
  tone,
  icon,
  trailing,
  children,
  ...props
}: ContextMenuSubmenuTriggerProps) {
  return (
    <BaseContextMenu.SubmenuTrigger
      {...props}
      render={<ContextMenuSubmenuTriggerElement tone={tone} />}
    >
      {icon != null ? <ContextMenuItemIcon>{icon}</ContextMenuItemIcon> : null}
      <ContextMenuItemLabel>{children}</ContextMenuItemLabel>
      {trailing != null ? <ContextMenuItemShortcut>{trailing}</ContextMenuItemShortcut> : null}
      <ContextMenuSubmenuTriggerIndicator>
        <ChevronRight />
      </ContextMenuSubmenuTriggerIndicator>
    </BaseContextMenu.SubmenuTrigger>
  );
}
