import { cva, cx, type VariantProps } from "class-variance-authority";

import { nodeSlotClass } from "../../internal/node-slot";
import { type StrictVariantProps } from "../../internal/variant-props";

// Table is a structural data primitive. The designer locked two layout looks (Figma
// "Table" vs "Spreadsheet") as the only `mode` axis, and baked everything else
// (header chrome, cell padding, row hover, sort-indicator position, focus ring) into
// the component so every table stays consistent. Every part's className lives here as
// a cva pairing, so no part takes a `className` at its boundary.

// The rounded, hairline scroll frame around the `<table>`. The ready-made grafts the Base UI
// ScrollArea.Root onto this styled frame via `render`.
export const tableScrollAreaVariants = cva(
  "relative flex max-h-full w-full flex-col overflow-hidden rounded-lg border border-subtle bg-surface-1",
);

// The scroll viewport that the `<table>` lives in.
export const tableScrollAreaViewportVariants = cva(
  cx(
    "min-h-0 flex-1 overscroll-contain rounded-[inherit] outline-none",
    "focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-inset",
  ),
);

// The `<table>` element itself.
export const tableModes = cva("w-full caption-bottom border-collapse text-13 text-primary");

// `<thead>` / `<tbody>` carry no chrome of their own; the cva keeps every part styled
// in one place even when the pairing is empty.
export const tableHeaderVariants = cva("");

export const tableBodyVariants = cva("");

// A body `<tr>`: the row hover tint (an "always" per the designer) and a hover group so
// pinned cells can react to the row's hover.
export const tableRowVariants = cva("group/body-row bg-layer-2 hover:bg-layer-2-hover");

// A header cell (`<th>`). `mode` is the table look; the row/edge borders come from
// the surrounding `Table`'s mode via `pinned`/`edge`. Sticky to the top so the
// header stays visible while the body scrolls (an "always").
export const tableHeadVariants = cva(
  cx(
    "sticky top-0 h-[38px] px-4 py-2 text-start align-middle",
    "bg-layer-1 text-12 font-semibold text-tertiary",
  ),
  {
    variants: {
      // The surrounding table look, which decides this cell's borders.
      mode: {
        table: "border-b border-subtle",
        spreadsheet: "border-e-[0.5px] border-b-[0.5px] border-subtle last:border-e-0",
      },
      // Pin this header to an inline edge while the body scrolls sideways.
      pinned: {
        none: "z-20",
        start: "sticky inset-s-0 z-30 border-e-[0.5px] border-subtle",
        end: "sticky inset-e-0 z-30 border-s-[0.5px] border-subtle",
      },
    },
  },
);

// A data cell (`<td>`). `mode` decides its borders; `pinned` makes it stick to an
// inline edge (carrying its own background so scrolled content does not show through).
export const tableCellVariants = cva("h-11 align-middle", {
  variants: {
    mode: {
      table: "border-b-[0.5px] border-subtle group-last/body-row:border-b-0",
      spreadsheet:
        "border-e-[0.5px] border-b-[0.5px] border-subtle group-last/body-row:border-b-0 last:border-e-0",
    },
    pinned: {
      none: "",
      start:
        "sticky inset-s-0 z-10 border-e-[0.5px] border-subtle bg-layer-2 group-hover/body-row:bg-layer-2-hover",
      end: "sticky inset-e-0 z-10 border-s-[0.5px] border-subtle bg-layer-2 group-hover/body-row:bg-layer-2-hover",
    },
    // Cells that host a full-cell trigger (editable/action) drop their own padding so
    // the trigger fills the cell; plain cells keep the standard padding.
    padding: {
      cell: "px-4 py-2",
      trigger: "p-0",
    },
  },
});

// Per-axis types derive from the cvas (the single source of truth). `mode`/`pinned` are shared by
// head + cell; `padding` is cell-only. The `<Name>VariantProps` bundles stay PRIVATE — a part
// imports its own for `Props` (rule 10) and never re-exports it.
type TableCellVariantConfig = VariantProps<typeof tableCellVariants>;

/** The two table looks: `table` (row dividers only) and `spreadsheet` (full grid). */
export type TableMode = NonNullable<TableCellVariantConfig["mode"]>;

/** Which inline edge a header/cell pins to (or `none`) while the table scrolls sideways. */
export type TablePinned = NonNullable<TableCellVariantConfig["pinned"]>;

/** A cell's inner spacing: `cell` pads the content; `trigger` drops it for a full-cell trigger. */
export type TableCellPadding = NonNullable<TableCellVariantConfig["padding"]>;

export type TableCellVariantProps = StrictVariantProps<typeof tableCellVariants>;
export type TableHeadVariantProps = StrictVariantProps<typeof tableHeadVariants>;

// The inline flex layout inside a plain cell: leading slot, growing content, trailing
// slot. Padding lives on the `<td>` (`TableCell`), not here.
export const tableCellLayoutVariants = cva("flex items-center gap-2 [--node-size:1.25rem]");

// The growing text region of a cell; truncates instead of overflowing.
export const tableCellContentVariants = cva("min-w-0 flex-1 truncate");

const tableHeadTitleDefaultVariants = {
  visibility: "visible",
} as const;

// The label region inside a `TableHead`: truncates the column title, or visually hides it for
// icon/action columns that still need an accessible header.
export const tableHeadTitleVariants = cva("truncate", {
  variants: {
    visibility: {
      visible: "",
      hidden: "sr-only",
    },
  },
  defaultVariants: tableHeadTitleDefaultVariants,
});

type TableHeadTitleVariantConfig = VariantProps<typeof tableHeadTitleVariants>;
export type TableHeadTitleVisibility = NonNullable<TableHeadTitleVariantConfig["visibility"]>;
export type TableHeadTitleVariantProps = StrictVariantProps<
  typeof tableHeadTitleVariants,
  keyof typeof tableHeadTitleDefaultVariants
>;

// The sort control inside a sortable `TableHead`: a button that wraps the title + the
// sort indicator. The chevron sits to the inline-end of the text (an "always").
export const tableHeadSortTriggerVariants = cva(
  cx(
    "-mx-1 inline-flex items-center gap-1.5 rounded-sm px-1 [--node-size:0.875rem]",
    "text-tertiary hover:text-secondary",
    "outline-none focus-visible:ring-2 focus-visible:ring-accent-strong",
    "cursor-pointer",
  ),
);

// The sort chevron at the trailing edge of a sort control. Sizes its single glyph via
// the node-slot class and tints it; the caller passes the direction glyph.
export const tableHeadSortIndicatorVariants = cva(cx(nodeSlotClass, "text-icon-secondary"));

// The full-cell trigger inside an editable/action cell (rendered as the styled outer of
// a Base UI Menu trigger). `layout` picks the editable (text + trailing chevron) or
// action (centered icon) layout; `selected` keeps the active editable cell tinted.
export const tableCellTriggerVariants = cva(
  cx(
    "group/cell-trigger flex h-11 w-full items-center outline-none [--node-size:1.25rem]",
    "bg-layer-transparent hover:bg-layer-transparent-hover focus-visible:bg-layer-transparent-hover",
    "data-popup-open:bg-layer-transparent-active",
    "disabled:pointer-events-none disabled:text-disabled",
  ),
  {
    variants: {
      layout: {
        editable: "justify-between gap-1 px-4 text-start",
        action: "justify-center px-4",
      },
      selected: {
        true: "bg-layer-transparent-selected",
        false: "",
      },
    },
  },
);

// The truncating value text inside an editable cell trigger.
export const tableCellTriggerLabelVariants = cva("min-w-0 truncate");

// The trailing glyph slot inside a cell trigger (the editable chevron, the action
// ellipsis). Sizes its single child via the node-slot class and tints it, dimming when
// the trigger is disabled.
export const tableCellTriggerIndicatorVariants = cva(
  cx(nodeSlotClass, "text-icon-secondary group-disabled/cell-trigger:text-icon-disabled"),
);
