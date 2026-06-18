import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import type * as React from "react";

import { scrollAreaContentVariants } from "./variants";

/** Props for {@link ScrollAreaContent}; 1:1 with Base UI `ScrollArea.Content`. */
export type ScrollAreaContentProps = Omit<
  React.ComponentProps<typeof BaseScrollArea.Content>,
  "className" | "style"
>;

/** 1:1 wrapper around Base UI `ScrollArea.Content`. */
export function ScrollAreaContent(props: ScrollAreaContentProps) {
  return <BaseScrollArea.Content className={scrollAreaContentVariants()} {...props} />;
}
