import { ChevronDown } from "lucide-react";
import type * as React from "react";

import { Menu, MenuTrigger, type MenuProps } from "../../ui/menu/index";
import {
  actionableTriggerVariants,
  pinnedCellVariants,
  selectedTriggerVariants,
  tableCellVariants,
  type TablePinned,
  useTableVariant,
} from "../../ui/table/index";

export type TableEditableCellProps = Omit<
  React.ComponentProps<"td">,
  "className" | "style" | "children"
> & {
  /** The current value shown in the cell. */
  value: React.ReactNode;
  /** The dropdown menu shown when the cell is clicked. */
  children: React.ReactNode;
  /** Whether the menu is open (controlled). */
  open?: boolean;
  /** Default open state for an uncontrolled cell. @default false */
  defaultOpen?: boolean;
  /** Called when the menu requests to open or close. */
  onOpenChange?: MenuProps["onOpenChange"];
  /** Disables the trigger so the cell can't be edited. */
  disabled?: boolean;
  /** Marks this as the actively-selected cell. */
  selected?: boolean;
  /** Pin this cell to the inline-start/end edge when the table scrolls sideways. */
  pinned?: TablePinned;
  /** Accessible name for the trigger when the value alone isn't descriptive. */
  "aria-label"?: string;
};

/** An editable data cell (`<td>`) with a full-cell dropdown trigger. */
export function TableEditableCell({
  value,
  children,
  open,
  defaultOpen,
  onOpenChange,
  disabled,
  selected,
  pinned,
  "aria-label": ariaLabel,
  ...props
}: TableEditableCellProps) {
  const tableVariant = useTableVariant();
  return (
    <td
      className={[
        tableCellVariants({ tableVariant }),
        "p-0",
        pinnedCellVariants({ pinned: pinned ?? "none" }),
      ].join(" ")}
      {...props}
    >
      <Menu open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <MenuTrigger
          disabled={disabled}
          aria-label={ariaLabel}
          render={
            <button
              type="button"
              className={[
                actionableTriggerVariants(),
                "group/editable-cell justify-between gap-1 px-4 text-start",
                selected ? selectedTriggerVariants() : "",
              ].join(" ")}
            />
          }
        >
          <span className="min-w-0 truncate">{value}</span>
          <span className="flex size-5 shrink-0 items-center justify-center">
            <ChevronDown
              aria-hidden
              className="size-3.5 text-icon-secondary group-disabled/editable-cell:text-icon-disabled"
            />
          </span>
        </MenuTrigger>
        {children}
      </Menu>
    </td>
  );
}
