import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import type * as React from "react";

import { scrollAreaViewportVariants } from "./variants";

/** Props for {@link ScrollAreaViewport}; 1:1 with Base UI `ScrollArea.Viewport`. */
export type ScrollAreaViewportProps = Omit<
  React.ComponentProps<typeof BaseScrollArea.Viewport>,
  "className" | "style"
>;

/** 1:1 wrapper around Base UI `ScrollArea.Viewport`. */
export function ScrollAreaViewport(props: ScrollAreaViewportProps) {
  return <BaseScrollArea.Viewport className={scrollAreaViewportVariants()} {...props} />;
}
