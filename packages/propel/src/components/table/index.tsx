import { cva, cx, type VariantProps } from "class-variance-authority";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import * as React from "react";
import { Dropdown, DropdownTrigger } from "../dropdown/index";

// Figma "Table" node 4017-653 ships two layouts that share the same cell metrics
// (38px tall, px-3 py-2, header on `background/layer/1`, body on `surface-1`) and
// differ only in their dividers:
//   • `table`       — row dividers only (header underline + a hairline under each
//                     body row); no vertical rules.
//   • `spreadsheet` — a full grid: every header and body cell draws a 0.5px
//                     `border/subtle` on all sides.
// The variant is owned by the root and read by the cells through context, so a
// consumer only sets it once on `<Table>`.

export type TableVariant = "table" | "spreadsheet";

const TableVariantContext = React.createContext<TableVariant>("table");

export type TableProps = Omit<React.ComponentProps<"table">, "className" | "style"> & {
  /**
   * Layout (required). `table` draws row dividers only; `spreadsheet` draws a full
   * grid (every cell bordered on all sides). Both share the same cell metrics.
   */
  variant: TableVariant;
};

/**
 * Root `<table>`. Compose with `TableHeader`, `TableBody`, `TableRow`,
 * `TableHead`, `TableCell`, and `TableEditableCell`. Renders on `surface-1` with a
 * rounded hairline outer border (Figma `radius/lg`). Pass `variant="table"` for row
 * dividers or `variant="spreadsheet"` for a full grid; the cells read it via context.
 */
export function Table({ variant, ...props }: TableProps) {
  return (
    <TableVariantContext.Provider value={variant}>
      {/* `overflow-clip` lets the rounded outer border clip the corner cells. */}
      <table
        className="w-full caption-bottom border-collapse overflow-clip rounded-lg border border-subtle bg-surface-1 text-13 text-primary"
        {...props}
      />
    </TableVariantContext.Provider>
  );
}

export type TableHeaderProps = Omit<React.ComponentProps<"thead">, "className" | "style">;

/** Header section (`<thead>`). Holds a single `TableRow` of `TableHead` cells. */
export function TableHeader(props: TableHeaderProps) {
  return <thead {...props} />;
}

export type TableBodyProps = Omit<React.ComponentProps<"tbody">, "className" | "style">;

/** Body section (`<tbody>`). Holds the data `TableRow`s. */
export function TableBody(props: TableBodyProps) {
  return <tbody {...props} />;
}

export type TableRowProps = Omit<React.ComponentProps<"tr">, "className" | "style">;

/**
 * A table row (`<tr>`). Body rows tint on hover. Dividers are drawn per-cell (so the
 * `spreadsheet` grid works), so the row itself carries only the hover treatment.
 */
export function TableRow(props: TableRowProps) {
  // `group/body-row` so a `table`-variant cell can drop its bottom divider on the
  // last row (`group-last/body-row:border-b-0`) and close the rounded table cleanly.
  return <tr className="group/body-row hover:bg-layer-2-hover" {...props} />;
}

// Per-variant cell borders. In `table`, only a bottom hairline divides rows (header
// uses the 1px `border/sm`, body cells the 0.5px `border/xs`); in `spreadsheet`,
// every cell is fully bordered (0.5px `border/xs` on all sides) to form the grid.
const headBorder: Record<TableVariant, string> = {
  table: "border-b border-subtle",
  spreadsheet: "border-[0.5px] border-subtle",
};
const cellBorder: Record<TableVariant, string> = {
  // Last body row drops its bottom divider so the rounded table closes cleanly.
  table: "border-b-[0.5px] border-subtle group-last/body-row:border-b-0",
  spreadsheet: "border-[0.5px] border-subtle",
};

// Header cells follow the Figma "Table header" component: 38px tall, `px-3 py-2`,
// `text-12` semibold on `background/layer/1`. A plain header uses `text/secondary`;
// a sortable header switches to `text/tertiary` and exposes a sort affordance.
const tableHeadVariants = cva("h-[38px] px-3 py-2 text-start align-middle text-12 font-semibold", {
  variants: {
    variant: {
      default: "bg-layer-1 text-secondary",
      sortable: "bg-layer-1 text-tertiary",
    },
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
     * Visual treatment. `sortable` renders a clickable button with a sort chevron;
     * set it whenever you pass `sort`.
     */
    variant: NonNullable<VariantProps<typeof tableHeadVariants>["variant"]>;
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
export function TableHead({ variant, sort = "none", onSort, children, ...props }: TableHeadProps) {
  const tableVariant = React.useContext(TableVariantContext);
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
      className={cx(tableHeadVariants({ variant }), headBorder[tableVariant])}
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

// Shared `<td>` chrome for both the plain and editable cells: 38px tall, px-3 py-2,
// `align-middle`, plus the per-variant border read from context.
function useTableCellClass() {
  const tableVariant = React.useContext(TableVariantContext);
  return cx("h-[38px] px-3 py-2 align-middle", cellBorder[tableVariant]);
}

export type TableCellProps = Omit<React.ComponentProps<"td">, "className" | "style">;

/** A data cell (`<td>`). 38px tall with `px-3 py-2` and `text-13` body text. */
export function TableCell({ children, ...props }: TableCellProps) {
  const className = useTableCellClass();
  return (
    <td className={className} {...props}>
      <div className="truncate">{children}</div>
    </td>
  );
}

export type TableEditableCellProps = Omit<
  React.ComponentProps<"td">,
  "className" | "style" | "children"
> & {
  /**
   * The current value shown in the cell (e.g. `"Admin"`). It sits before the
   * trailing chevron and labels the trigger button.
   */
  value: React.ReactNode;
  /**
   * The dropdown menu shown when the cell is clicked. Pass a propel `Dropdown`
   * composition — typically a `DropdownContent` with `DropdownItem`s. The cell
   * owns the `Dropdown` root + the trigger; you only supply the menu surface.
   */
  children: React.ReactNode;
  /**
   * Whether the menu is open (controlled). Pair with `onOpenChange`; omit for an
   * uncontrolled cell that manages its own open state.
   */
  open?: boolean;
  /** Default open state for an uncontrolled cell. @default false */
  defaultOpen?: boolean;
  /** Called when the menu requests to open or close. */
  onOpenChange?: (open: boolean) => void;
  /** Disables the trigger so the cell can't be edited. */
  disabled?: boolean;
  /** Accessible name for the trigger when the value alone isn't descriptive. */
  "aria-label"?: string;
};

/**
 * An editable data cell (`<td>`). Renders the current `value` plus a trailing
 * chevron as a single button that opens the propel `Dropdown` passed as `children`
 * to pick a new value (Figma "Account type" cell). It owns the `Dropdown` root and
 * trigger, so you only pass the menu surface:
 *
 *   <TableEditableCell value={role} onOpenChange={…}>
 *     <DropdownContent>
 *       <DropdownItem variant="default" label="Admin" onClick={() => setRole("Admin")} />
 *       <DropdownItem variant="default" label="Member" onClick={() => setRole("Member")} />
 *     </DropdownContent>
 *   </TableEditableCell>
 */
export function TableEditableCell({
  value,
  children,
  open,
  defaultOpen,
  onOpenChange,
  disabled,
  "aria-label": ariaLabel,
  ...props
}: TableEditableCellProps) {
  const className = useTableCellClass();
  return (
    // The `<td>` keeps no padding so the full-bleed trigger button fills the cell
    // (the button re-applies the px-3/py-2 inset). This keeps the click target the
    // whole cell, matching the Figma editable cell.
    <td className={cx(className, "p-0")} {...props}>
      <Dropdown open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <DropdownTrigger
          disabled={disabled}
          aria-label={ariaLabel}
          render={
            <button
              type="button"
              className={cx(
                "flex h-[38px] w-full items-center justify-between gap-1 px-3 py-2 text-start outline-none",
                "rounded-none hover:bg-layer-2-hover focus-visible:bg-layer-2-hover",
                "disabled:pointer-events-none disabled:text-disabled",
              )}
            />
          }
        >
          <span className="min-w-0 truncate">{value}</span>
          {/* 14px chevron in a 20px icon slot, mirroring the Figma trigger. */}
          <span className="flex size-5 shrink-0 items-center justify-center">
            <ChevronDown aria-hidden className="size-3.5 text-icon-secondary" />
          </span>
        </DropdownTrigger>
        {children}
      </Dropdown>
    </td>
  );
}
