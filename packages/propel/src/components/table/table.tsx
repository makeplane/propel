import type * as React from "react";

import { ScrollAreaCorner, ScrollAreaScrollbar, ScrollAreaThumb } from "../../ui/scroll-area";
import {
  Table as TableRoot,
  type TableProps as TableRootProps,
  TableScrollArea,
  type TableVariant,
  TableScrollAreaViewport,
} from "../../ui/table";
import { TableVariantContext } from "./table-context";

export type TableProps = TableRootProps & {
  /** Layout (required). `table` draws row dividers only; `spreadsheet` draws a full grid. */
  variant: TableVariant;
  children?: React.ReactNode;
};

/**
 * The ready-made table: the styled `<table>` wrapped in a rounded, hairline-bordered scroll frame,
 * sharing its layout `variant` with the cells/heads via context.
 */
export function Table({ variant, children, ...props }: TableProps) {
  return (
    <TableVariantContext.Provider value={variant}>
      <TableScrollArea>
        <TableScrollAreaViewport>
          <TableRoot {...props}>{children}</TableRoot>
        </TableScrollAreaViewport>
        <ScrollAreaScrollbar orientation="vertical" visibility="auto" magnitude="thin">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaScrollbar orientation="horizontal" visibility="auto" magnitude="thin">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner />
      </TableScrollArea>
    </TableVariantContext.Provider>
  );
}
