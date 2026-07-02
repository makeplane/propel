import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import type * as React from "react";

import { ScrollAreaCorner, ScrollAreaScrollbar, ScrollAreaThumb } from "../../elements/scroll-area";
import {
  Table as TableElement,
  type TableProps as TableElementProps,
  TableScrollArea,
  type TableMode,
  TableScrollAreaViewport,
} from "../../elements/table";
import { TableModeContext } from "./table-context";

export type TableProps = TableElementProps & {
  /** Layout (required). `table` draws row dividers only; `spreadsheet` draws a full grid. */
  mode: TableMode;
  children?: React.ReactNode;
};

/**
 * The ready-made table: the styled `<table>` wrapped in a rounded, hairline-bordered scroll frame,
 * sharing its layout `mode` with the cells/heads via context. The Base UI `ScrollArea` behavior
 * grafts onto the styled `TableScrollArea` frame + viewport (and the overlay scrollbars) via
 * `render`, behavior part outer.
 */
export function Table({ mode, children, ...props }: TableProps) {
  return (
    <TableModeContext.Provider value={mode}>
      <BaseScrollArea.Root render={<TableScrollArea />}>
        <BaseScrollArea.Viewport render={<TableScrollAreaViewport />}>
          <TableElement {...props}>{children}</TableElement>
        </BaseScrollArea.Viewport>
        <BaseScrollArea.Scrollbar
          orientation="vertical"
          render={<ScrollAreaScrollbar visibility="auto" magnitude="thin" />}
        >
          <BaseScrollArea.Thumb render={<ScrollAreaThumb />} />
        </BaseScrollArea.Scrollbar>
        <BaseScrollArea.Scrollbar
          orientation="horizontal"
          render={<ScrollAreaScrollbar visibility="auto" magnitude="thin" />}
        >
          <BaseScrollArea.Thumb render={<ScrollAreaThumb />} />
        </BaseScrollArea.Scrollbar>
        <BaseScrollArea.Corner render={<ScrollAreaCorner />} />
      </BaseScrollArea.Root>
    </TableModeContext.Provider>
  );
}
