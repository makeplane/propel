import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import type * as React from "react";

import { scrollbarClass, scrollbarThumbClass } from "../../internal/scrollbar";
import { TableVariantContext, type TableVariant } from "./table-context";
import { tableRootVariants, tableVariants, tableViewportVariants } from "./variants";

export type { TablePinned, TableVariant } from "./table-context";

export type TableProps = Omit<React.ComponentProps<"table">, "className" | "style"> & {
  /** Layout (required). `table` draws row dividers only; `spreadsheet` draws a full grid. */
  variant: TableVariant;
};

/** Root `<table>`, wrapped in a rounded, hairline-bordered scroll frame. */
export function Table({ variant, ...props }: TableProps) {
  return (
    <TableVariantContext.Provider value={variant}>
      <BaseScrollArea.Root className={tableRootVariants()}>
        <BaseScrollArea.Viewport className={tableViewportVariants()}>
          <table className={tableVariants()} {...props} />
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
