import { cva } from "class-variance-authority";

/** Styles the `<th>` element itself (background, padding, font, height). */
export const tableHeadVariants = cva(
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

/** Border applied to a `<th>` based on the table's layout variant. */
export const tableHeadBorderVariants = cva("", {
  variants: {
    tableVariant: {
      table: "border-b border-subtle",
      spreadsheet: "border-e-[0.5px] border-b-[0.5px] border-subtle last:border-e-0",
    },
  },
});

/** Border applied to a `<td>` based on the table's layout variant. */
export const tableCellBorderVariants = cva("", {
  variants: {
    tableVariant: {
      table: "border-b-[0.5px] border-subtle group-last/body-row:border-b-0",
      spreadsheet:
        "border-e-[0.5px] border-b-[0.5px] border-subtle group-last/body-row:border-b-0 last:border-e-0",
    },
  },
});

/** Positioning and z-index classes for a pinned `<th>`. */
export const pinnedHeadVariants = cva("z-20", {
  variants: {
    pinned: {
      none: "",
      start: "sticky inset-s-0 z-30 border-e-[0.5px] border-subtle",
      end: "sticky inset-e-0 z-30 border-s-[0.5px] border-subtle",
    },
  },
});

/** Positioning, z-index, and background for a pinned `<td>`. */
export const pinnedCellVariants = cva("", {
  variants: {
    pinned: {
      none: "",
      start:
        "sticky inset-s-0 z-10 border-e-[0.5px] border-subtle bg-layer-2 group-hover/body-row:bg-layer-2-hover",
      end: "sticky inset-e-0 z-10 border-s-[0.5px] border-subtle bg-layer-2 group-hover/body-row:bg-layer-2-hover",
    },
  },
});

/** Full `<td>` cell class: height, alignment, and the variant-driven border. */
export const tableCellVariants = cva("h-11 align-middle", {
  variants: {
    tableVariant: {
      table: "border-b-[0.5px] border-subtle group-last/body-row:border-b-0",
      spreadsheet:
        "border-e-[0.5px] border-b-[0.5px] border-subtle group-last/body-row:border-b-0 last:border-e-0",
    },
  },
});

/**
 * Interactive trigger that spans the full cell area. Used by `TableActionCell` and
 * `TableEditableCell` in the components tier.
 */
export const actionableTriggerVariants = cva([
  "flex h-11 w-full items-center outline-none",
  "bg-layer-transparent hover:bg-layer-transparent-hover focus-visible:bg-layer-transparent-hover",
  "data-popup-open:bg-layer-transparent-active",
  "disabled:pointer-events-none disabled:text-disabled",
]);

/**
 * Additional class applied to an actionable trigger when its row is the selected cell. This is a
 * single cva with no variants — callers compose it conditionally.
 */
export const selectedTriggerVariants = cva("bg-layer-transparent-selected");
