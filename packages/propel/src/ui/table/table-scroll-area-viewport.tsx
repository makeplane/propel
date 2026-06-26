import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";

import { tableScrollAreaViewportVariants } from "./variants";

export type TableScrollAreaViewportProps = Omit<
  BaseScrollArea.Viewport.Props,
  "className" | "style"
>;

/**
 * The scroll viewport inside a `TableScrollArea` that holds the `<table>` (a single
 * `ScrollArea.Viewport`).
 */
export function TableScrollAreaViewport(props: TableScrollAreaViewportProps) {
  return <BaseScrollArea.Viewport className={tableScrollAreaViewportVariants()} {...props} />;
}
