import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";

import { tabsListScrollAreaVariants } from "./variants";

export type TabsListScrollAreaProps = Omit<BaseScrollArea.Root.Props, "className" | "style">;

/**
 * The horizontal scroll frame around a `TabsList` (a single `ScrollArea.Root`). The ready-made
 * `components/tabs` `TabsList` composes this with the list (as the scroll viewport) and a scrollbar
 * so a long row of tabs scrolls sideways.
 */
export function TabsListScrollArea(props: TabsListScrollAreaProps) {
  return <BaseScrollArea.Root className={tabsListScrollAreaVariants()} {...props} />;
}
