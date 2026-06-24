import * as React from "react";

import { dialogActionsVariants } from "./variants";

export type DialogActionsProps = Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style">;

/**
 * The footer row of the dialog popup. Right-aligns action buttons (cancel, confirm, etc.) with a
 * gap between them. Padding is baked in to match the header and body gutters.
 */
export function DialogActions(props: DialogActionsProps) {
  return <div className={dialogActionsVariants()} {...props} />;
}
