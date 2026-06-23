import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";

import { scrollAreaThumbVariants } from "./variants";

/** Props for {@link ScrollAreaThumb}; 1:1 with Base UI `ScrollArea.Thumb`. */
export type ScrollAreaThumbProps = Omit<BaseScrollArea.Thumb.Props, "className" | "style">;

/** 1:1 wrapper around Base UI `ScrollArea.Thumb`. */
export function ScrollAreaThumb(props: ScrollAreaThumbProps) {
  return <BaseScrollArea.Thumb className={scrollAreaThumbVariants()} {...props} />;
}
