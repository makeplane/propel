import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import * as React from "react";

import { ScrollAreaScrollbar, ScrollAreaThumb } from "../../ui/scroll-area";
import {
  TabsIndicator,
  TabsList as TabsListElement,
  type TabsListProps as TabsListElementProps,
  TabsListScrollArea,
} from "../../ui/tabs";
import { TabsAppearanceContext } from "./tabs-context";

export type TabsListProps = Omit<TabsListElementProps, "appearance">;

/**
 * The ready-made tab strip: composes the atomic `TabsList` (taking the set's `appearance` from
 * context) rendered as the scroll viewport inside a horizontal `TabsListScrollArea` so a long row
 * of tabs scrolls, and renders the active-tab underline `TabsIndicator` for the `underline`
 * appearance.
 */
export function TabsList({ children, ...props }: TabsListProps) {
  const appearance = React.useContext(TabsAppearanceContext);
  return (
    <TabsListScrollArea>
      <TabsListElement appearance={appearance} render={<BaseScrollArea.Viewport />} {...props}>
        {children}
        {appearance === "underline" ? <TabsIndicator /> : null}
      </TabsListElement>
      <ScrollAreaScrollbar orientation="horizontal" visibility="auto" magnitude="thin">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
    </TabsListScrollArea>
  );
}
