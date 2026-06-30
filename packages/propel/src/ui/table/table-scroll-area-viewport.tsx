import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { tableScrollAreaViewportVariants } from "./variants";

export type TableScrollAreaViewportProps = Omit<
  useRender.ComponentProps<"div">,
  "className" | "style"
>;

/**
 * The scroll viewport inside a `TableScrollArea` that holds the `<table>` — a single styled
 * `<div>`. It bakes no scroll behavior: the ready-made `components/table` grafts the Base UI
 * `ScrollArea.Viewport` on by rendering it as this part's `render` target (the styled viewport
 * stays the outer element so its className wins).
 */
export function TableScrollAreaViewport({ render, ...props }: TableScrollAreaViewportProps) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps({ className: tableScrollAreaViewportVariants() }, props),
  });
}
