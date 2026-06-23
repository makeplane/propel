import type * as React from "react";

import { paginationPerPageIndicatorVariants } from "./variants";

export type PaginationPerPageIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The chevron inside the per-page trigger. Renders whatever icon you pass (sized to `--node-size`,
 * 14px) and rotates a half-turn while the menu is open. Decorative — the trigger carries the
 * accessible name and state — so `aria-hidden`.
 */
export function PaginationPerPageIndicator(props: PaginationPerPageIndicatorProps) {
  return <span aria-hidden className={paginationPerPageIndicatorVariants()} {...props} />;
}
