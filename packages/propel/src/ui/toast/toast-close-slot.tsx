import type * as React from "react";

import { toastCloseSlotVariants } from "./variants";

export type ToastCloseSlotProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "className" | "style"
> & {
  /** The dismiss `IconButton` (whose render target is a `ToastClose`). */
  children?: React.ReactNode;
};

/**
 * The positioned slot that pins the dismiss button to the toast's inline-end corner. Holds only the
 * 4px corner offset against the `relative` toast popup; the button's chrome comes from the composed
 * `IconButton`.
 */
export function ToastCloseSlot(props: ToastCloseSlotProps) {
  return <div className={toastCloseSlotVariants()} {...props} />;
}
