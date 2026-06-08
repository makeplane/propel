import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import * as React from "react";

// The whole table renders on `background/surface-1` with a subtle 1px divider
// between rows (Figma "Table" — header 38px, cells 38px, `px-4 py-2`).

export type TableProps = Omit<React.ComponentProps<"table">, "className" | "style">;

/**
 * Root `<table>`. Compose with `TableHeader`, `TableBody`, `TableRow`,
 * `TableHead`, and `TableCell`. Renders on `surface-1` with `text-13` body text.
 */
export function Table(props: TableProps) {
  return (
    <table
      className="w-full caption-bottom border-collapse bg-surface-1 text-13 text-primary"
      {...props}
    />
  );
}

export type TableHeaderProps = Omit<React.ComponentProps<"thead">, "className" | "style">;

/** Header section (`<thead>`). Holds a single `TableRow` of `TableHead` cells. */
export function TableHeader(props: TableHeaderProps) {
  return <thead className="border-b border-subtle" {...props} />;
}

export type TableBodyProps = Omit<React.ComponentProps<"tbody">, "className" | "style">;

/** Body section (`<tbody>`). Holds the data `TableRow`s. */
export function TableBody(props: TableBodyProps) {
  return <tbody {...props} />;
}

export type TableRowProps = Omit<React.ComponentProps<"tr">, "className" | "style">;

/**
 * A table row (`<tr>`). Body rows draw a subtle bottom divider and tint on hover;
 * the divider after the last row is hidden so the table closes cleanly.
 */
export function TableRow(props: TableRowProps) {
  return <tr className="border-b border-subtle last:border-0 hover:bg-layer-2-hover" {...props} />;
}

// Header cells follow the Figma "Table header" component: 38px tall, `px-4 py-2`,
// `text-12` semibold. A plain header sits on `background/layer/1` with
// `text/secondary`; a sortable header switches to `surface-1` + `text/tertiary`
// and exposes a sort affordance.
const tableHeadVariants = cva("h-[38px] px-4 py-2 text-start align-middle text-12 font-semibold", {
  variants: {
    variant: {
      default: "bg-layer-1 text-secondary",
      sortable: "bg-surface-1 text-tertiary",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

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
    /**
     * Visual treatment. `sortable` switches to the surface background and renders
     * a clickable button with a sort chevron; set it whenever you pass `sort`.
     */
    variant?: NonNullable<VariantProps<typeof tableHeadVariants>["variant"]>;
    /**
     * Current sort state for a sortable header. Drives both the chevron icon
     * (`asc`→up, `desc`→down, `none`→up/down) and the cell's `aria-sort`.
     */
    sort?: TableHeadSort;
    /** Click handler for the sort control; only used when the header is sortable. */
    onSort?: () => void;
  };

/**
 * A header cell (`<th>`). Pass `variant="sortable"` (with `sort`/`onSort`) to turn
 * the label into an interactive sort control: it renders a lucide chevron
 * (aria-hidden) and reflects the order via `aria-sort` for assistive tech.
 */
export function TableHead({
  variant = "default",
  sort = "none",
  onSort,
  children,
  ...props
}: TableHeadProps) {
  const isSortable = variant === "sortable";
  // Only render the interactive sort control when there's a handler to drive it;
  // a sortable-styled header without `onSort` falls back to a plain label so we
  // never expose a focusable button that does nothing.
  const hasSortControl = isSortable && onSort != null;
  const SortGlyph = sortIcon[sort];
  return (
    <th
      scope="col"
      aria-sort={isSortable ? ariaSort[sort] : undefined}
      className={tableHeadVariants({ variant })}
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

// Keeps the chevron a fixed 14px (Figma sort icon) with the muted icon color.
function ChevronGlyphSlot({ Glyph }: { Glyph: typeof ChevronsUpDown }) {
  return <Glyph aria-hidden className="size-3.5 shrink-0 text-icon-secondary" />;
}

export type TableCellProps = Omit<React.ComponentProps<"td">, "className" | "style">;

/** A data cell (`<td>`). 38px tall with `px-4 py-2` and `text-13` body text. */
export function TableCell({ children, ...props }: TableCellProps) {
  return (
    <td className="h-[38px] px-4 py-2 align-middle" {...props}>
      <div className="truncate">{children}</div>
    </td>
  );
}
