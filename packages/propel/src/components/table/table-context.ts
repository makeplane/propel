import * as React from "react";

import { type TableMode } from "../../ui/table";

/**
 * Carries the root `Table`'s `mode` down to each `TableHead`/`TableCell` so they pick the
 * matching borders. Lives in the components tier: a context is cross-tree coordination —
 * composition — not a single-element `ui` concern.
 */
export const TableModeContext = React.createContext<TableMode>("table");

/** Reads the surrounding `Table`'s `mode` (used by the components `TableCell`/`TableHead`). */
export function useTableMode(): TableMode {
  return React.useContext(TableModeContext);
}
