import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import * as React from "react";

import {
  TableHead as TableHeadElement,
  type TableHeadProps as TableHeadElementProps,
  TableHeadSortIndicator,
  TableHeadSortTrigger,
  TableHeadTitle,
} from "../../ui/table/index";
import { useTableMode } from "./table-context";

/** Sort direction of a sortable `TableHead`. `none` shows the neutral affordance. */
export type TableHeadSort = "asc" | "desc" | "none";

const sortGlyph: Record<TableHeadSort, typeof ChevronsUpDown> = {
  asc: ChevronUp,
  desc: ChevronDown,
  none: ChevronsUpDown,
};

const ariaSort: Record<TableHeadSort, React.AriaAttributes["aria-sort"]> = {
  asc: "ascending",
  desc: "descending",
  none: "none",
};

export type TableHeadProps = Omit<TableHeadElementProps, "aria-sort" | "mode"> & {
  /** Visual treatment. `sortable` renders the title as a sort-cycling button. */
  /** Whether this header is interactive sortable (renders a sort trigger + reflects `aria-sort`). */
  sortable?: boolean;
  /** Current sort state for a sortable header. @default "none" */
  sort?: TableHeadSort;
  /** Click handler for the sort control; only used when the header is sortable. */
  onSort?: () => void;
};

/** A ready-made header cell: a plain title, or (when sortable) a sort-cycling button with a chevron. */
export function TableHead({
  sortable = false,
  sort = "none",
  onSort,
  children,
  ...props
}: TableHeadProps) {
  const tableMode = useTableMode();
  const isSortable = sortable;
  const hasSortControl = isSortable && onSort != null;
  const SortGlyph = sortGlyph[sort];

  return (
    <TableHeadElement
      mode={tableMode}
      aria-sort={isSortable ? ariaSort[sort] : undefined}
      {...props}
    >
      {hasSortControl ? (
        <TableHeadSortTrigger onClick={onSort}>
          <TableHeadTitle>{children}</TableHeadTitle>
          <TableHeadSortIndicator>
            <SortGlyph />
          </TableHeadSortIndicator>
        </TableHeadSortTrigger>
      ) : (
        <TableHeadTitle>{children}</TableHeadTitle>
      )}
    </TableHeadElement>
  );
}
