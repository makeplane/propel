import { cx } from "class-variance-authority";
import { Ellipsis } from "lucide-react";
import type * as React from "react";

import { Dropdown, DropdownTrigger, type DropdownProps } from "../dropdown/index";
import {
  actionableTriggerClass,
  pinnedCellClass,
  type TablePinned,
  useTableCellClass,
} from "./table-context";

export type TableActionCellProps = Omit<
  React.ComponentProps<"td">,
  "className" | "style" | "children"
> & {
  /** The dropdown menu of row actions. */
  children: React.ReactNode;
  /** Accessible name for the trigger (e.g. "Row options"). Required (icon-only). */
  "aria-label": string;
  /** Trigger glyph. @default an ellipsis. */
  icon?: React.ReactNode;
  /** Whether the menu is open (controlled). Pair with `onOpenChange`. */
  open?: boolean;
  /** Default open state for an uncontrolled cell. @default false */
  defaultOpen?: boolean;
  /** Called when the menu requests to open or close. */
  onOpenChange?: DropdownProps["onOpenChange"];
  /** Disables the trigger. */
  disabled?: boolean;
  /** Pin this cell to the inline-start/end edge when the table scrolls sideways. */
  pinned?: TablePinned;
};

/** An icon-only action cell (`<td>`) that opens a row-actions dropdown. */
export function TableActionCell({
  children,
  "aria-label": ariaLabel,
  icon,
  open,
  defaultOpen,
  onOpenChange,
  disabled,
  pinned,
  ...props
}: TableActionCellProps) {
  const className = useTableCellClass();
  return (
    <td className={cx(className, "p-0", pinnedCellClass(pinned))} {...props}>
      <Dropdown open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <DropdownTrigger
          disabled={disabled}
          aria-label={ariaLabel}
          render={
            <button
              type="button"
              className={cx(actionableTriggerClass, "group/action-cell justify-center px-4")}
            />
          }
        >
          <span className="flex size-5 shrink-0 items-center justify-center text-icon-secondary group-disabled/action-cell:text-icon-disabled">
            {icon ?? <Ellipsis aria-hidden className="size-3.5" />}
          </span>
        </DropdownTrigger>
        {children}
      </Dropdown>
    </td>
  );
}
