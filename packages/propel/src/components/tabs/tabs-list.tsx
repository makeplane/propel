import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import * as React from "react";

import { ScrollAreaScrollbar, ScrollAreaThumb } from "../../ui/scroll-area";
import {
  TabsIndicator,
  TabsList as TabsListRoot,
  type TabsListProps as TabsListRootProps,
  TabsListScrollArea,
} from "../../ui/tabs";
import { TabsVariantContext } from "./tabs-context";

export type TabsListProps = Omit<TabsListRootProps, "variant">;

/**
 * The ready-made tab strip: composes the atomic `TabsList` (taking the set's `variant` from
 * context) rendered as the scroll viewport inside a horizontal `TabsListScrollArea` so a long row
 * of tabs scrolls, and renders the active-tab underline `TabsIndicator` for the `underline`
 * variant.
 */
export function TabsList({ children, ...props }: TabsListProps) {
  const variant = React.useContext(TabsVariantContext);
  return (
    <TabsListScrollArea>
      <TabsListRoot variant={variant} render={<BaseScrollArea.Viewport />} {...props}>
        {children}
        {variant === "underline" ? <TabsIndicator /> : null}
      </TabsListRoot>
      <ScrollAreaScrollbar orientation="horizontal" visibility="auto" magnitude="thin">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
    </TabsListScrollArea>
  );
}
