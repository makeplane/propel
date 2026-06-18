import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import * as React from "react";

import { scrollbarClass, scrollbarThumbClass } from "../../internal/scrollbar";
import { TabsList as TabsListRoot, type TabsListProps as TabsListRootProps } from "../../ui/tabs";

export type TabsListProps = TabsListRootProps;

/**
 * The ready-made tab strip: composes the atomic `TabsList` inside a Base UI `ScrollArea` so a long
 * row of tabs scrolls horizontally with propel's overlay scrollbar. The atomic `TabsList` renders
 * as the scroll viewport.
 */
export function TabsList({ children, ...props }: TabsListProps) {
  return (
    <BaseScrollArea.Root className="relative max-w-full">
      <TabsListRoot render={<BaseScrollArea.Viewport />} {...props}>
        {children}
      </TabsListRoot>
      <BaseScrollArea.Scrollbar orientation="horizontal" className={scrollbarClass}>
        <BaseScrollArea.Thumb className={scrollbarThumbClass} />
      </BaseScrollArea.Scrollbar>
    </BaseScrollArea.Root>
  );
}
