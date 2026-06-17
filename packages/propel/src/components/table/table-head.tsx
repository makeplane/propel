import { cx, type VariantProps } from "class-variance-authority";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import * as React from "react";

import {
  headBorder,
  pinnedHeadClass,
  tableHeadVariants,
  TableVariantContext,
  type TablePinned,
} from "./table-context";

/** Sort direction of a sortable `TableHead`. `none` shows the neutral affordance. */
export type TableHeadSort = "asc" | "desc" | "none";

const sortIcon: Record<TableHeadSort, typeof ChevronsUpDown> = {
  asc: ChevronUp,
  desc: ChevronDown,
  none: ChevronsUpDown,
};

const ariaSort: Record<TableHeadSort, React.AriaAttributes["aria-sort"]> = {
  asc: "ascending",
  desc: "descending",
  none: "none",
};

export type TableHeadProps = Omit<React.ComponentProps<"th">, "className" | "style" | "aria-sort"> &
  VariantProps<typeof tableHeadVariants> & {
    /** Visual treatment. */
    variant: NonNullable<VariantProps<typeof tableHeadVariants>["variant"]>;
    /** Current sort state for a sortable header. */
    sort?: TableHeadSort;
    /** Click handler for the sort control; only used when the header is sortable. */
    onSort?: () => void;
    /** Pin this header to the inline-start/end edge when the table scrolls sideways. */
    pinned?: TablePinned;
  };

/** A header cell (`<th>`), optionally sortable and/or pinned. */
export function TableHead({
  variant,
  sort = "none",
  onSort,
  pinned,
  children,
  ...props
}: TableHeadProps) {
  const tableVariant = React.useContext(TableVariantContext);
  const isSortable = variant === "sortable";
  const hasSortControl = isSortable && onSort != null;
  const SortGlyph = sortIcon[sort];

  return (
    <th
      scope="col"
      aria-sort={isSortable ? ariaSort[sort] : undefined}
      className={cx(
        tableHeadVariants({ variant }),
        headBorder[tableVariant],
        pinnedHeadClass(pinned),
      )}
      {...props}
    >
      {hasSortControl ? (
        <button
          type="button"
          onClick={onSort}
          className="-mx-1 inline-flex items-center gap-1.5 rounded-sm px-1 text-tertiary hover:text-secondary"
        >
          <span className="truncate">{children}</span>
          <ChevronGlyphSlot Glyph={SortGlyph} />
        </button>
      ) : (
        <div className="truncate">{children}</div>
      )}
    </th>
  );
}

function ChevronGlyphSlot({ Glyph }: { Glyph: typeof ChevronsUpDown }) {
  return <Glyph aria-hidden className="size-3.5 shrink-0 text-icon-secondary" />;
}
