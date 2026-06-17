import { Menu } from "@base-ui/react/menu";
import { cx } from "class-variance-authority";
import { ChevronRight } from "lucide-react";
import type * as React from "react";

import { NodeSlot } from "../../internal/node-slot";

export type DropdownSubTriggerProps = Omit<
  React.ComponentProps<typeof Menu.SubmenuTrigger>,
  "className" | "style" | "label"
> & {
  /** Leading content before the label. */
  inlineStartNode?: React.ReactNode;
  /** The primary text of the row. */
  label?: React.ReactNode;
  /** Trailing content before the chevron. */
  inlineEndNode?: React.ReactNode;
};

/** The row that opens a submenu. */
export function DropdownSubTrigger({
  inlineStartNode,
  label,
  inlineEndNode,
  children,
  ...props
}: DropdownSubTriggerProps) {
  return (
    <Menu.SubmenuTrigger
      className={cx(
        "group/item flex h-[34px] w-full cursor-default items-center gap-2 rounded-md px-2 text-13 outline-none select-none [--node-size:1rem]",
        "text-secondary",
        "data-highlighted:bg-layer-transparent-hover data-popup-open:bg-layer-transparent-hover",
        "data-disabled:pointer-events-none data-disabled:text-disabled",
      )}
      {...props}
    >
      {inlineStartNode != null ? <NodeSlot>{inlineStartNode}</NodeSlot> : null}
      <span className="min-w-0 flex-1 truncate">{label ?? children}</span>
      {inlineEndNode != null ? <NodeSlot>{inlineEndNode}</NodeSlot> : null}
      <ChevronRight
        className="size-4 shrink-0 text-icon-tertiary group-data-disabled/item:text-icon-disabled rtl:-scale-x-100"
        aria-hidden="true"
      />
    </Menu.SubmenuTrigger>
  );
}
