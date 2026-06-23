import type * as React from "react";

import { ellipsisVariants } from "./variants";

export type PaginationEllipsisProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * A non-interactive gap marker between distant page numbers. Renders whatever icon you pass (sized
 * to the slot's `--node-size`, 14px) — never baking a specific glyph in. Decorative, so
 * `aria-hidden`.
 */
export function PaginationEllipsis(props: PaginationEllipsisProps) {
  return <span aria-hidden className={ellipsisVariants()} {...props} />;
}
