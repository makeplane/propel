import type * as React from "react";

import { toastActionGroupVariants } from "./variants";

export type ToastActionGroupProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "className" | "style"
> & {
  /** The cluster of plain action buttons (e.g. `ToastActionButton`s). */
  children?: React.ReactNode;
};

/**
 * The inline-start cluster of plain action buttons inside a `ToastActions` row. Grows to fill the
 * row so a trailing `ToastAction` pins to the inline-end edge.
 */
export function ToastActionGroup(props: ToastActionGroupProps) {
  return <div className={toastActionGroupVariants()} {...props} />;
}
