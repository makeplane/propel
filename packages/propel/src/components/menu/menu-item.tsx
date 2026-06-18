import { Check } from "lucide-react";
import type * as React from "react";

import { NodeSlot } from "../../internal/node-slot";
import { MenuItem as MenuItemRoot, type MenuItemProps as MenuItemRootProps } from "../../ui/menu";

export type MenuItemProps = MenuItemRootProps & {
  /** Leading content before the label. */
  inlineStartNode?: React.ReactNode;
  /** The primary text of the row. */
  label?: React.ReactNode;
  /** Muted secondary line under the label. */
  description?: React.ReactNode;
  /** Muted text shown inline after the label. */
  secondaryText?: React.ReactNode;
  /** Trailing content after the label. */
  inlineEndNode?: React.ReactNode;
  /** Single-select selected state. */
  selected?: boolean;
};

/**
 * The ready-made selectable menu row: composes the atomic `MenuItem` and lays out optional
 * leading/trailing nodes, the label, a secondary line, and the single-select check indicator.
 */
export function MenuItem({
  inlineStartNode,
  label,
  description,
  secondaryText,
  inlineEndNode,
  selected,
  children,
  ...props
}: MenuItemProps) {
  return (
    <MenuItemRoot {...props}>
      {inlineStartNode != null ? <NodeSlot>{inlineStartNode}</NodeSlot> : null}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex min-w-0 items-baseline gap-1.5">
          <span className="truncate">{label ?? children}</span>
          {secondaryText != null ? (
            <span className="shrink-0 truncate text-12 text-tertiary group-data-disabled/item:text-disabled">
              {secondaryText}
            </span>
          ) : null}
        </span>
        {description != null ? (
          <span className="truncate text-12 text-tertiary group-data-disabled/item:text-disabled">
            {description}
          </span>
        ) : null}
      </span>
      {inlineEndNode != null ? <NodeSlot>{inlineEndNode}</NodeSlot> : null}
      {selected ? (
        <span className="flex h-5 w-4 shrink-0 items-center justify-center">
          <Check className="size-4 text-icon-accent-primary" aria-hidden="true" />
        </span>
      ) : null}
    </MenuItemRoot>
  );
}
