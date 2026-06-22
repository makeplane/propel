import { ChevronRight } from "lucide-react";
import type * as React from "react";

import { NodeSlot } from "../../internal/node-slot";
import {
  MenuSubTrigger as MenuSubTriggerRoot,
  type MenuSubTriggerProps as MenuSubTriggerRootProps,
} from "../../ui/menu";

export type MenuSubTriggerProps = MenuSubTriggerRootProps & {
  /** Leading content before the label. */
  inlineStartNode?: React.ReactNode;
  /** The primary text of the row. */
  label?: React.ReactNode;
  /** Trailing content before the chevron. */
  inlineEndNode?: React.ReactNode;
};

/**
 * The ready-made submenu trigger row: composes the atomic `MenuSubTrigger` and lays out optional
 * leading/trailing nodes, the label, and the chevron.
 */
export function MenuSubTrigger({
  inlineStartNode,
  label,
  inlineEndNode,
  children,
  ...props
}: MenuSubTriggerProps) {
  return (
    <MenuSubTriggerRoot {...props}>
      {inlineStartNode != null ? <NodeSlot>{inlineStartNode}</NodeSlot> : null}
      <span className="min-w-0 flex-1 truncate">{label ?? children}</span>
      {inlineEndNode != null ? <NodeSlot>{inlineEndNode}</NodeSlot> : null}
      <ChevronRight
        className="size-4 shrink-0 text-icon-tertiary group-data-disabled/item:text-icon-disabled rtl:-scale-x-100"
        aria-hidden="true"
      />
    </MenuSubTriggerRoot>
  );
}
