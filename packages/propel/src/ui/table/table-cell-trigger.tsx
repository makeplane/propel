import type * as React from "react";

import { tableCellTriggerVariants } from "./variants";

export type TableCellTriggerLayout = "editable" | "action";

export type TableCellTriggerProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "className" | "style" | "type"
> & {
  /** `editable` lays out a value + trailing chevron; `action` centers an icon. */
  layout: TableCellTriggerLayout;
  /** Keeps the active editable cell tinted. @default false */
  selected?: boolean;
};

/**
 * The full-cell `<button>` inside an editable/action cell. Built as the styled outer of a Base UI
 * Menu trigger via its `render` prop, so the trigger's behavior projects onto this look. Carries a
 * `cell-trigger` group so its indicator can dim while disabled.
 */
export function TableCellTrigger({ layout, selected = false, ...props }: TableCellTriggerProps) {
  return (
    <button type="button" className={tableCellTriggerVariants({ layout, selected })} {...props} />
  );
}
