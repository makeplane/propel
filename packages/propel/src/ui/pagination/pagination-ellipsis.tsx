import type * as React from "react";

import { type PaginationMagnitude, ellipsisVariants } from "./variants";

export type PaginationEllipsisProps = {
  magnitude: PaginationMagnitude;
  children: React.ReactNode;
};

/**
 * A non-interactive gap marker between distant page numbers. Pass the ellipsis icon as `children`;
 * it is sized via `[&>svg]`.
 */
export function PaginationEllipsis({ magnitude, children }: PaginationEllipsisProps) {
  return (
    <li aria-hidden className={ellipsisVariants({ magnitude })}>
      {children}
    </li>
  );
}
