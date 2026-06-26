import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";

import { tableScrollAreaVariants } from "./variants";

export type TableScrollAreaProps = Omit<BaseScrollArea.Root.Props, "className" | "style">;

/**
 * The rounded, hairline-bordered scroll frame around a `Table` (a single `ScrollArea.Root`). The
 * ready-made `components/table` composes this with the `TableScrollAreaViewport`, the `<table>`,
 * and the scrollbars.
 */
export function TableScrollArea(props: TableScrollAreaProps) {
  return <BaseScrollArea.Root className={tableScrollAreaVariants()} {...props} />;
}
