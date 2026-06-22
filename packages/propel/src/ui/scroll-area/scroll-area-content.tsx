import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";

import { scrollAreaContentVariants } from "./variants";

/** Props for {@link ScrollAreaContent}; 1:1 with Base UI `ScrollArea.Content`. */
export type ScrollAreaContentProps = Omit<BaseScrollArea.Content.Props, "className" | "style">;

/** 1:1 wrapper around Base UI `ScrollArea.Content`. */
export function ScrollAreaContent(props: ScrollAreaContentProps) {
  return <BaseScrollArea.Content className={scrollAreaContentVariants()} {...props} />;
}
