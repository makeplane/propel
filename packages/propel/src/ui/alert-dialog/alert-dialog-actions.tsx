import * as React from "react";

import { alertDialogActionsVariants } from "./variants";

export type AlertDialogActionsProps = React.HTMLAttributes<HTMLDivElement> & {
  /** The action buttons to right-align — e.g. a cancel `AlertDialogClose` and a confirming action. */
  children?: React.ReactNode;
};

/**
 * Right-aligns action buttons with consistent horizontal spacing. The placement and gap are always
 * the same — baked in by the design system.
 */
export function AlertDialogActions(props: AlertDialogActionsProps) {
  return <div className={alertDialogActionsVariants()} {...props} />;
}
