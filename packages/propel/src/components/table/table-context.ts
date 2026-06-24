import * as React from "react";

import { type TableVariant } from "../../ui/table";

/**
 * Carries the root `Table`'s `variant` down to each `TableHead`/`TableCell` so they pick the
 * matching borders. Lives in the components tier: a context is cross-tree coordination —
 * composition — not a single-element `ui` concern.
 */
export const TableVariantContext = React.createContext<TableVariant>("table");

/** Reads the surrounding `Table`'s `variant` (used by the components `TableCell`/`TableHead`). */
export function useTableVariant(): TableVariant {
  return React.useContext(TableVariantContext);
}
