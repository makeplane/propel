import * as React from "react";

import { alertDialogIntroVariants } from "./variants";

export type AlertDialogIntroProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Groups the title and description with consistent vertical spacing. The gap between title and
 * description is always the same — baked in by the design system.
 */
export function AlertDialogIntro(props: AlertDialogIntroProps) {
  return <div className={alertDialogIntroVariants()} {...props} />;
}
