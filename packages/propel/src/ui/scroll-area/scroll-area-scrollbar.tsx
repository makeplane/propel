import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";

import { scrollbarClass } from "../../internal/scrollbar";

/** Props for {@link ScrollAreaScrollbar}; 1:1 with Base UI `ScrollArea.Scrollbar`. */
export type ScrollAreaScrollbarProps = Omit<BaseScrollArea.Scrollbar.Props, "className" | "style">;

/** 1:1 wrapper around Base UI `ScrollArea.Scrollbar`. */
export function ScrollAreaScrollbar(props: ScrollAreaScrollbarProps) {
  return <BaseScrollArea.Scrollbar className={scrollbarClass} {...props} />;
}
