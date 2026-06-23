import * as React from "react";

/** The two table looks: `table` (row dividers only) and `spreadsheet` (full grid). */
export type TableVariant = "table" | "spreadsheet";

/** Which inline edge a header/cell pins to while the table scrolls sideways. */
export type TablePinned = "start" | "end";

/**
 * Carries the root `Table`'s `variant` down to each `TableHead`/`TableCell` so they pick the
 * matching borders without the caller repeating the look on every cell.
 */
export const TableVariantContext = React.createContext<TableVariant>("table");

/** Reads the surrounding `Table`'s `variant`. */
export function useTableVariant(): TableVariant {
  return React.useContext(TableVariantContext);
}
