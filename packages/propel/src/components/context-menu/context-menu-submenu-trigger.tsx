import { ChevronRight } from "lucide-react";
import type * as React from "react";

import { NodeSlot } from "../../internal/node-slot";
import {
  ContextMenuSubmenuTrigger as ContextMenuSubmenuTriggerRoot,
  type ContextMenuSubmenuTriggerProps as ContextMenuSubmenuTriggerRootProps,
} from "../../ui/context-menu";

export type ContextMenuSubmenuTriggerProps = Omit<ContextMenuSubmenuTriggerRootProps, "label"> & {
  /** Leading content before the label. */
  inlineStartNode?: React.ReactNode;
  /** The primary text of the row. */
  label?: React.ReactNode;
  /** Trailing content before the chevron. */
  inlineEndNode?: React.ReactNode;
};

/**
 * The ready-made submenu trigger: composes the atomic `ContextMenuSubmenuTrigger` and lays out
 * optional leading and trailing content slots around the label, plus the chevron that points toward
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
    <ContextMenuSubmenuTriggerRoot {...props}>
      {inlineStartNode != null ? <NodeSlot>{inlineStartNode}</NodeSlot> : null}
      <span className="min-w-0 flex-1 truncate">{label ?? children}</span>
      {inlineEndNode != null ? <NodeSlot>{inlineEndNode}</NodeSlot> : null}
      <ChevronRight
        className="size-4 shrink-0 text-icon-tertiary group-data-disabled/item:text-icon-disabled rtl:-scale-x-100"
        aria-hidden="true"
      />
    </ContextMenuSubmenuTriggerRoot>
  );
}
