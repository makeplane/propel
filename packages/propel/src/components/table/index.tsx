import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { ChevronDown, ChevronsUpDown, ChevronUp, Ellipsis } from "lucide-react";
import * as React from "react";
import { scrollbarClass, scrollbarThumbClass } from "../../internal/scrollbar";
import { Dropdown, DropdownTrigger } from "../dropdown/index";

// Figma "Table" node 5196-4084 ships two layouts that share the same cell metrics
// (38px header / 44px body, px-4 py-2, header on `background/layer/1`, rows on
// `background/layer/2`) and differ only in their dividers:
//   • `table`       — row dividers only (header underline + a hairline under each
//                     body row); no vertical rules.
//   • `spreadsheet` — a full grid: every header and body cell draws a 0.5px
//                     `border/subtle` on all sides.
// The whole table sits inside a rounded, `border/subtle`-bordered, scrollable frame.
// The variant is owned by the root and read by the cells through context, so a
// consumer only sets it once on `<Table>`.

export type TableVariant = "table" | "spreadsheet";

// Which edge a cell is pinned to while the table scrolls horizontally (the "make the
// first / last column sticky" option). `start` sticks to the inline-start edge, `end`
// to the inline-end edge. Set it on a column's header AND its body cells.
export type TablePinned = "start" | "end";

const TableVariantContext = React.createContext<TableVariant>("table");

export type TableProps = Omit<React.ComponentProps<"table">, "className" | "style"> & {
  /**
   * Layout (required). `table` draws row dividers only; `spreadsheet` draws a full
   * grid (every cell bordered on all sides). Both share the same cell metrics.
   */
  variant: TableVariant;
};

/**
 * Root `<table>`, wrapped in a rounded, hairline-bordered scroll frame. Compose with
 * `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`,
 * `TableEditableCell`, and `TableActionCell`. The frame scrolls when the table
 * overflows it (constrain its parent's height to scroll vertically); the header stays
 * pinned to the top, and columns can be pinned with each cell's `pinned` prop.
 *
 * Pass `variant="table"` for row dividers or `variant="spreadsheet"` for a full grid;
 * the cells read it via context.
 */
export function Table({ variant, ...props }: TableProps) {
  return (
    <TableVariantContext.Provider value={variant}>
      {/* The scroll frame is a Base UI ScrollArea: its Viewport is a real scroll
          container (so sticky headers + pinned columns work relative to it) and its
          scrollbar is an OVERLAY thumb positioned absolutely — it never reserves a
          gutter, so the header isn't clipped and the table width stays constant whether
          or not the scrollbar shows. The Root owns the outer `border/subtle`, the
          `radius/lg` corners, and clips the overflow (a `<table>` can't clip its own
          rounded corners). `max-h-full` caps it at a height-constrained parent so it
          scrolls instead of growing. Base UI gives the Viewport `tabIndex=0` only while
          it overflows, satisfying axe `scrollable-region-focusable` without a stray tab
          stop when the table fits. */}
      <BaseScrollArea.Root className="relative flex max-h-full w-full flex-col overflow-hidden rounded-lg border border-subtle bg-surface-1">
        <BaseScrollArea.Viewport className="min-h-0 flex-1 overscroll-contain rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-strong">
          <table
            className="w-full caption-bottom border-collapse text-13 text-primary"
            {...props}
          />
        </BaseScrollArea.Viewport>
        <BaseScrollArea.Scrollbar orientation="vertical" className={scrollbarClass}>
          <BaseScrollArea.Thumb className={scrollbarThumbClass} />
        </BaseScrollArea.Scrollbar>
        <BaseScrollArea.Scrollbar orientation="horizontal" className={scrollbarClass}>
          <BaseScrollArea.Thumb className={scrollbarThumbClass} />
        </BaseScrollArea.Scrollbar>
        <BaseScrollArea.Corner />
      </BaseScrollArea.Root>
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
 * A table row (`<tr>`). Body rows sit on `layer-2` and tint to `layer-2-hover` on
 * hover. Dividers are drawn per-cell (so the `spreadsheet` grid works), so the row
 * itself carries only the background + hover.
 */
export function TableRow(props: TableRowProps) {
  // `group/body-row` so a `table`-variant cell can drop its bottom divider on the last
  // row (`group-last/body-row:border-b-0`) and a pinned cell can follow the row's hover.
  return <tr className="group/body-row bg-layer-2 hover:bg-layer-2-hover" {...props} />;
}

// Per-variant cell borders. The scroll frame already draws the single outer
// `border/subtle` ring (and rounds the corners), so cells only ever draw INTERIOR
// dividers — drawing a full border on the edge cells too would double the frame's ring
// (a visible 1px-ish double line that squared off the rounded corners).
//
// In `table`, only a bottom hairline divides rows (header uses the 1px `border/sm`,
// body cells the 0.5px `border/xs`). In `spreadsheet`, a full grid: each cell adds an
// inline-end divider (logical `border-e`, RTL-safe) plus the bottom hairline; the last
// column drops its end divider (`last:border-e-0`) and the last row drops its bottom
// divider so the frame's ring stays single all the way around.
const headBorder: Record<TableVariant, string> = {
  table: "border-b border-subtle",
  spreadsheet: "border-b-[0.5px] border-e-[0.5px] border-subtle last:border-e-0",
};
const cellBorder: Record<TableVariant, string> = {
  // Last body row drops its bottom divider so the rounded table closes cleanly.
  table: "border-b-[0.5px] border-subtle group-last/body-row:border-b-0",
  spreadsheet:
    "border-b-[0.5px] border-e-[0.5px] border-subtle last:border-e-0 group-last/body-row:border-b-0",
};

// Sticky-column pinning. A pinned cell sticks to the inline-start/end edge while the
// table scrolls sideways. A `start` column draws a hairline on its inline-end edge and
// an `end` column on its inline-start edge (logical, RTL-safe) so the pinned column
// reads as separated from the content scrolling under it. Body cells get an opaque
// background (matching the row, incl. its hover) so scrolled columns slide beneath them;
// the header's pinned cell sits above both the sticky header row (z-20) and the pinned
// body column (z-10).
function pinnedEdgeBorder(pinned: TablePinned) {
  return pinned === "start" ? "border-e-[0.5px] border-subtle" : "border-s-[0.5px] border-subtle";
}
function pinnedHeadClass(pinned: TablePinned | undefined) {
  if (!pinned) return "z-20";
  return cx("sticky z-30", pinned === "start" ? "start-0" : "end-0", pinnedEdgeBorder(pinned));
}
function pinnedCellClass(pinned: TablePinned | undefined) {
  if (!pinned) return "";
  return cx(
    "sticky z-10 bg-layer-2 group-hover/body-row:bg-layer-2-hover",
    pinned === "start" ? "start-0" : "end-0",
    pinnedEdgeBorder(pinned),
  );
}

// Header cells follow the Figma "Table header" component: 38px tall, `px-4 py-2`,
// `text-12` semibold on `background/layer/1` in `text/tertiary` (the muted header
// token from Figma). `sticky top-0` keeps the header in view while the body scrolls
// (the `layer-1` fill is opaque, so rows pass under it).
const tableHeadVariants = cva(
  "sticky top-0 h-[38px] px-4 py-2 text-start align-middle text-12 font-semibold text-tertiary",
  {
    variants: {
      variant: {
        default: "bg-layer-1",
        sortable: "bg-layer-1",
      },
    },
  },
);

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
    /** Pin this header to the inline-start/end edge when the table scrolls sideways. */
    pinned?: TablePinned;
  };

/**
 * A header cell (`<th>`). Pass `variant="sortable"` (with `sort`/`onSort`) to turn
 * the label into an interactive sort control: it renders a lucide chevron
 * (aria-hidden) and reflects the order via `aria-sort` for assistive tech. Pass
 * `pinned` to make the column sticky on horizontal scroll (set it on the body cells too).
 */
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
  // Only render the interactive sort control when there's a handler to drive it;
  // a sortable-styled header without `onSort` falls back to a plain label so we
  // never expose a focusable button that does nothing.
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

// Keeps the chevron a fixed 14px (Figma sort icon) with the muted icon color.
function ChevronGlyphSlot({ Glyph }: { Glyph: typeof ChevronsUpDown }) {
  return <Glyph aria-hidden className="size-3.5 shrink-0 text-icon-secondary" />;
}

// Shared `<td>` chrome for the plain, editable, and action cells: 44px tall,
// `align-middle`, plus the per-variant border read from context. Padding is
// intentionally NOT included here: the plain cell adds `px-4 py-2`, while the editable
// and action cells stay `p-0` so their full-bleed button supplies the inset. (Baking
// padding in and overriding it with `p-0` is order-fragile under `cx`, which is what
// made editable rows render too tall.)
function useTableCellClass() {
  const tableVariant = React.useContext(TableVariantContext);
  return cx("h-11 align-middle", cellBorder[tableVariant]);
}

// A leading/trailing slot inside a cell — an icon or an avatar that sits beside the
// cell's content. It never shrinks and centers its node; the node sizes itself.
function TableCellSlot({ children }: { children: React.ReactNode }) {
  return <span className="flex shrink-0 items-center">{children}</span>;
}

export type TableCellProps = Omit<React.ComponentProps<"td">, "className" | "style"> & {
  /** Leading content beside the cell text — an icon or an `Avatar`. */
  inlineStartNode?: React.ReactNode;
  /** Trailing content beside the cell text — an icon or an `Avatar`. */
  inlineEndNode?: React.ReactNode;
  /** Pin this cell to the inline-start/end edge when the table scrolls sideways. */
  pinned?: TablePinned;
};

/**
 * A data cell (`<td>`). 44px tall with `px-4 py-2` and `text-13` body text. Optional
 * `inlineStartNode` / `inlineEndNode` slots hold a leading/trailing icon or `Avatar`
 * (e.g. an avatar before a name). `pinned` keeps the column sticky on horizontal scroll.
 */
export function TableCell({
  inlineStartNode,
  inlineEndNode,
  pinned,
  children,
  ...props
}: TableCellProps) {
  const className = useTableCellClass();
  return (
    <td className={cx(className, "px-4 py-2", pinnedCellClass(pinned))} {...props}>
      <div className="flex items-center gap-2">
        {inlineStartNode != null ? <TableCellSlot>{inlineStartNode}</TableCellSlot> : null}
        <div className="min-w-0 flex-1 truncate">{children}</div>
        {inlineEndNode != null ? <TableCellSlot>{inlineEndNode}</TableCellSlot> : null}
      </div>
    </td>
  );
}

// Shared chrome for the interactive cell triggers (editable + action). An actionable
// cell is transparent so the row shows through, and tints with a `layer-transparent`
// overlay on hover / keyboard focus / while its menu is open — distinct from the row's
// own hover, matching the Figma "actionable cell" treatment.
const actionableTriggerClass = cx(
  "flex h-11 w-full items-center outline-none",
  "bg-layer-transparent hover:bg-layer-transparent-hover focus-visible:bg-layer-transparent-hover",
  "data-[popup-open]:bg-layer-transparent-active",
  "disabled:pointer-events-none disabled:text-disabled",
);

// The persistent "this cell is the selected one" tint, a step stronger than hover, on
// the `layer-transparent-selected` token. It stays under the open/hover overlays so an
// open or hovered selected cell still reads its interaction state on top.
const selectedTriggerClass = "bg-layer-transparent-selected";

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
  /**
   * Marks this as the actively-selected cell (e.g. the focused cell in a spreadsheet),
   * giving it a persistent `layer-transparent-selected` tint a step stronger than hover.
   */
  selected?: boolean;
  /** Pin this cell to the inline-start/end edge when the table scrolls sideways. */
  pinned?: TablePinned;
  /** Accessible name for the trigger when the value alone isn't descriptive. */
  "aria-label"?: string;
};

/**
 * An editable data cell (`<td>`). Renders the current `value` plus a trailing
 * chevron as a single button that opens the propel `Dropdown` passed as `children`
 * to pick a new value (Figma "Account type" cell). It owns the `Dropdown` root and
 * trigger, so you only pass the menu surface:
 *
 * ```tsx
 * <TableEditableCell value={role} onOpenChange={…}>
 *   <DropdownContent>
 *     <DropdownItem variant="default" label="Admin" onClick={() => setRole("Admin")} />
 *     <DropdownItem variant="default" label="Member" onClick={() => setRole("Member")} />
 *   </DropdownContent>
 * </TableEditableCell>
 * ```
 */
export function TableEditableCell({
  value,
  children,
  open,
  defaultOpen,
  onOpenChange,
  disabled,
  selected,
  pinned,
  "aria-label": ariaLabel,
  ...props
}: TableEditableCellProps) {
  const className = useTableCellClass();
  return (
    // The `<td>` keeps no padding so the full-bleed trigger button fills the cell
    // (the button re-applies the px-4/py-2 inset). This keeps the click target the
    // whole cell, matching the Figma editable cell.
    <td className={cx(className, "p-0", pinnedCellClass(pinned))} {...props}>
      <Dropdown open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <DropdownTrigger
          disabled={disabled}
          aria-label={ariaLabel}
          render={
            <button
              type="button"
              className={cx(
                actionableTriggerClass,
                "group/editable-cell justify-between gap-1 px-4 text-start",
                selected ? selectedTriggerClass : null,
              )}
            />
          }
        >
          <span className="min-w-0 truncate">{value}</span>
          {/* 14px chevron in a 20px icon slot, mirroring the Figma trigger. */}
          <span className="flex size-5 shrink-0 items-center justify-center">
            <ChevronDown
              aria-hidden
              className="size-3.5 text-icon-secondary group-disabled/editable-cell:text-icon-disabled"
            />
          </span>
        </DropdownTrigger>
        {children}
      </Dropdown>
    </td>
  );
}

export type TableActionCellProps = Omit<
  React.ComponentProps<"td">,
  "className" | "style" | "children"
> & {
  /**
   * The dropdown menu of row actions. Pass a propel `Dropdown` composition (a
   * `DropdownContent` with `DropdownItem`s). The cell owns the `Dropdown` root + the
   * icon trigger; you only supply the menu surface.
   */
  children: React.ReactNode;
  /** Accessible name for the trigger (e.g. "Row options"). Required (icon-only). */
  "aria-label": string;
  /** Trigger glyph. @default an ellipsis (`⋯`). */
  icon?: React.ReactNode;
  /** Whether the menu is open (controlled). Pair with `onOpenChange`. */
  open?: boolean;
  /** Default open state for an uncontrolled cell. @default false */
  defaultOpen?: boolean;
  /** Called when the menu requests to open or close. */
  onOpenChange?: (open: boolean) => void;
  /** Disables the trigger. */
  disabled?: boolean;
  /** Pin this cell to the inline-start/end edge when the table scrolls sideways. */
  pinned?: TablePinned;
};

/**
 * An icon-only action cell (`<td>`) — the trailing "⋯" that opens a menu of actions
 * for the row (Figma's row-options cell). Like `TableEditableCell` it owns the
 * `Dropdown` root + trigger and you pass only the menu surface; the trigger is an
 * icon button with the actionable-cell hover treatment.
 */
export function TableActionCell({
  children,
  "aria-label": ariaLabel,
  icon,
  open,
  defaultOpen,
  onOpenChange,
  disabled,
  pinned,
  ...props
}: TableActionCellProps) {
  const className = useTableCellClass();
  return (
    <td className={cx(className, "p-0", pinnedCellClass(pinned))} {...props}>
      <Dropdown open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <DropdownTrigger
          disabled={disabled}
          aria-label={ariaLabel}
          render={
            <button
              type="button"
              className={cx(actionableTriggerClass, "group/action-cell justify-center px-4")}
            />
          }
        >
          <span className="flex size-5 shrink-0 items-center justify-center text-icon-secondary group-disabled/action-cell:text-icon-disabled">
            {icon ?? <Ellipsis aria-hidden className="size-3.5" />}
          </span>
        </DropdownTrigger>
        {children}
      </Dropdown>
    </td>
  );
}
