import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import type * as React from "react";

import { scrollAreaRootVariants } from "./variants";

/** Props for {@link ScrollArea}; 1:1 with Base UI `ScrollArea.Root`. */
export type ScrollAreaProps = Omit<
  React.ComponentProps<typeof BaseScrollArea.Root>,
  "className" | "style"
>;

/**
 * 1:1 wrapper around Base UI `ScrollArea.Root`. This is the atomic part: it lays its viewport out
 * as a height-constrained flex column but renders no scrollbars itself. The ready-made scroller
 * that composes the viewport, scrollbars, thumb and corner lives in
 * `@plane/propel/components/scroll-area`.
 */
export function ScrollArea(props: ScrollAreaProps) {
  return <BaseScrollArea.Root className={scrollAreaRootVariants()} {...props} />;
}
