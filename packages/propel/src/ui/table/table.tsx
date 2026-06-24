import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { tableVariants } from "./variants";

export type { TablePinned, TableVariant } from "./table-context";

export type TableProps = Omit<useRender.ComponentProps<"table">, "className" | "style">;

/**
 * The styled `<table>` element — a single element. The ready-made `components/table` wraps it in
 * the rounded scroll frame (`TableScrollArea` + `TableScrollAreaViewport`) and shares the layout
 * `variant` with the cells/heads via context.
 */
export function Table({ render, ...props }: TableProps) {
  const defaultProps: useRender.ElementProps<"table"> = { className: tableVariants() };
  return useRender({ defaultTagName: "table", render, props: mergeProps(defaultProps, props) });
}
