import type * as React from "react";

import { paginationSpinnerVariants } from "./variants";

export type PaginationSpinnerProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The in-flight indicator a page button shows in place of its number while navigating to it. Spins
 * whatever icon you pass, sized to `--node-size` (14px) and tinted the placeholder color.
 * Decorative, so `aria-hidden`.
 */
export function PaginationSpinner(props: PaginationSpinnerProps) {
  return <span aria-hidden className={paginationSpinnerVariants()} {...props} />;
}
