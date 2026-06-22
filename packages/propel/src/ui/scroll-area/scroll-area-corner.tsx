import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";

import { scrollAreaCornerVariants } from "./variants";

/** Props for {@link ScrollAreaCorner}; 1:1 with Base UI `ScrollArea.Corner`. */
export type ScrollAreaCornerProps = Omit<BaseScrollArea.Corner.Props, "className" | "style">;

/** 1:1 wrapper around Base UI `ScrollArea.Corner`. */
export function ScrollAreaCorner(props: ScrollAreaCornerProps) {
  return <BaseScrollArea.Corner className={scrollAreaCornerVariants()} {...props} />;
}
