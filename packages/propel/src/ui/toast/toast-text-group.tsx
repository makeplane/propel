import type * as React from "react";

import { toastTextGroupVariants } from "./variants";

export type ToastTextGroupProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "className" | "style"
> & {
  /** The paired `ToastTitle` and `ToastDescription`. */
  children?: React.ReactNode;
};

/**
 * The tight vertical pairing of `ToastTitle` and `ToastDescription` at the top of a `ToastContent`.
 * Keeps the title and description close together while sitting in the content column's wider rhythm
 * alongside an optional progress bar and action row.
 */
export function ToastTextGroup(props: ToastTextGroupProps) {
  return <div className={toastTextGroupVariants()} {...props} />;
}
