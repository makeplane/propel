import { Check } from "lucide-react";
import type * as React from "react";

import { NodeSlot } from "../../internal/node-slot";
import {
  ContextMenuItem as ContextMenuItemRoot,
  type ContextMenuItemProps as ContextMenuItemRootProps,
} from "../../ui/context-menu";

export type ContextMenuItemProps = Omit<ContextMenuItemRootProps, "label"> & {
  /** Leading content before the label. */
  inlineStartNode?: React.ReactNode;
  /** The primary text of the row. */
  label?: React.ReactNode;
  /** Trailing content after the label. */
  inlineEndNode?: React.ReactNode;
  /** Single-select selected state. */
  selected?: boolean;
};

/**
 * The ready-made menu row: composes the atomic `ContextMenuItem` and lays out optional leading and
 * trailing content slots, the label, and a trailing check for single-select selected state.
 */
export function ContextMenuItem({
  inlineStartNode,
  label,
  inlineEndNode,
  selected,
  children,
  ...props
}: ContextMenuItemProps) {
  return (
    <ContextMenuItemRoot {...props}>
      {inlineStartNode != null ? <NodeSlot>{inlineStartNode}</NodeSlot> : null}
      <span className="min-w-0 flex-1 truncate">{label ?? children}</span>
      {inlineEndNode != null ? <NodeSlot>{inlineEndNode}</NodeSlot> : null}
      {selected ? (
        <span className="flex size-4 shrink-0 items-center justify-center">
          <Check className="size-4 text-icon-accent-primary" aria-hidden="true" />
        </span>
      ) : null}
    </ContextMenuItemRoot>
  );
}
