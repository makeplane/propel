import * as React from "react";

export type TableVariant = "table" | "spreadsheet";
export type TablePinned = "start" | "end";

export const TableVariantContext = React.createContext<TableVariant>("table");

export function useTableVariant() {
  return React.useContext(TableVariantContext);
}
