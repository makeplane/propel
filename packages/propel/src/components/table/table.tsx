import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import type * as React from "react";

import { ScrollAreaCorner, ScrollAreaScrollbar, ScrollAreaThumb } from "../../ui/scroll-area";
import {
  Table as TableElement,
  type TableProps as TableElementProps,
  TableScrollArea,
  type TableMode,
  TableScrollAreaViewport,
} from "../../ui/table";
import { TableModeContext } from "./table-context";

export type TableProps = TableElementProps & {
  /** Layout (required). `table` draws row dividers only; `spreadsheet` draws a full grid. */
  mode: TableMode;
  children?: React.ReactNode;
};

/**
 * The ready-made table: the styled `<table>` wrapped in a rounded, hairline-bordered scroll frame,
 * sharing its layout `mode` with the cells/heads via context.
 */
export function Table({ mode, children, ...props }: TableProps) {
  return (
    <TableModeContext.Provider value={mode}>
      <TableScrollArea render={<BaseScrollArea.Root />}>
        <TableScrollAreaViewport render={<BaseScrollArea.Viewport />}>
          <TableElement {...props}>{children}</TableElement>
        </TableScrollAreaViewport>
        <ScrollAreaScrollbar orientation="vertical" visibility="auto" magnitude="thin">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaScrollbar orientation="horizontal" visibility="auto" magnitude="thin">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner />
      </TableScrollArea>
    </TableModeContext.Provider>
  );
}
