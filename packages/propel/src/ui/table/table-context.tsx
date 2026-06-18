import { cx } from "class-variance-authority";
import * as React from "react";

export type TableVariant = "table" | "spreadsheet";
export type TablePinned = "start" | "end";

export const TableVariantContext = React.createContext<TableVariant>("table");

export const headBorder: Record<TableVariant, string> = {
  table: "border-b border-subtle",
  spreadsheet: "border-b-[0.5px] border-e-[0.5px] border-subtle last:border-e-0",
};

export const cellBorder: Record<TableVariant, string> = {
  table: "border-b-[0.5px] border-subtle group-last/body-row:border-b-0",
  spreadsheet:
    "border-b-[0.5px] border-e-[0.5px] border-subtle last:border-e-0 group-last/body-row:border-b-0",
};

function pinnedEdgeBorder(pinned: TablePinned) {
  return pinned === "start" ? "border-e-[0.5px] border-subtle" : "border-s-[0.5px] border-subtle";
}

export function pinnedHeadClass(pinned: TablePinned | undefined) {
  if (!pinned) return "z-20";
  return cx(
    "sticky z-30",
    pinned === "start" ? "inset-s-0" : "inset-e-0",
    pinnedEdgeBorder(pinned),
  );
}

export function pinnedCellClass(pinned: TablePinned | undefined) {
  if (!pinned) return "";
  return cx(
    "sticky z-10 bg-layer-2 group-hover/body-row:bg-layer-2-hover",
    pinned === "start" ? "inset-s-0" : "inset-e-0",
    pinnedEdgeBorder(pinned),
  );
}

export function useTableCellClass() {
  const tableVariant = React.useContext(TableVariantContext);
  return cx("h-11 align-middle", cellBorder[tableVariant]);
}

export function TableCellSlot({ children }: { children: React.ReactNode }) {
  return <span className="flex shrink-0 items-center">{children}</span>;
}

export const actionableTriggerClass = cx(
  "flex h-11 w-full items-center outline-none",
  "bg-layer-transparent hover:bg-layer-transparent-hover focus-visible:bg-layer-transparent-hover",
  "data-popup-open:bg-layer-transparent-active",
  "disabled:pointer-events-none disabled:text-disabled",
);

export const selectedTriggerClass = "bg-layer-transparent-selected";
