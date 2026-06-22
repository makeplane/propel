import { cx } from "class-variance-authority";
import { MoreHorizontal } from "lucide-react";

import { slotBase } from "./variants";

/** A non-interactive gap marker between distant page numbers. */
export function PaginationEllipsis() {
  return (
    <li aria-hidden className={cx(slotBase, "text-icon-placeholder")}>
      <MoreHorizontal className="size-3.5 shrink-0" />
    </li>
  );
}
