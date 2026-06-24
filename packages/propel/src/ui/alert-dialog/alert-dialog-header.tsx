import type * as React from "react";

import { alertDialogHeaderVariants } from "./variants";

export type AlertDialogHeaderProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "className" | "style"
>;

/**
 * The top region of the popup: lays out the leading `AlertDialogIcon` at the inline-start of the
 * `AlertDialogIntro` (icon left of title), per the design spec. The icon and intro are passed as
 * children.
 */
export function AlertDialogHeader(props: AlertDialogHeaderProps) {
  return <div className={alertDialogHeaderVariants()} {...props} />;
}
