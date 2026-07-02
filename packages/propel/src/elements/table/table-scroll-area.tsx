import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { tableScrollAreaVariants } from "./variants";

export type TableScrollAreaProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The rounded, hairline-bordered scroll frame around a `Table` — a single styled `<div>`. It bakes
 * no scroll behavior: Base-UI-agnostic — the ready-made `components/table` grafts the Base UI
 * `ScrollArea.Root` onto it via `<BaseScrollArea.Root render={<TableScrollArea/>} />` (behavior
 * part outer), alongside the `TableScrollAreaViewport`, the `<table>`, and the scrollbars.
 */
export function TableScrollArea({ render, ...props }: TableScrollAreaProps) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps({ className: tableScrollAreaVariants() }, props),
  });
}
