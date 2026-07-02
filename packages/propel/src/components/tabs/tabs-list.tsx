import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import { ScrollAreaScrollbar, ScrollAreaThumb } from "../../elements/scroll-area";
import { TabsList as TabsListElement, TabsListScrollArea } from "../../elements/tabs";
import { TabsAppearanceContext } from "./tabs-context";
import { TabsIndicator } from "./tabs-indicator";

export type TabsListProps = Omit<BaseTabs.List.Props, "className" | "style">;

/**
 * The ready-made tab strip: grafts the Base UI `ScrollArea.Root` onto the styled
 * `TabsListScrollArea` frame, then grafts the Base UI `Tabs.List` behavior onto the styled
 * `TabsList` (taking the set's `appearance` from context) rendered as the scroll viewport, plus a
 * horizontal scrollbar so a long row of tabs scrolls, and renders the active-tab underline
 * `TabsIndicator` for the `underline` appearance.
 */
export function TabsList({ children, ...props }: TabsListProps) {
  const appearance = React.useContext(TabsAppearanceContext);
  return (
    <BaseScrollArea.Root render={<TabsListScrollArea />}>
      <BaseTabs.List
        render={<BaseScrollArea.Viewport render={<TabsListElement appearance={appearance} />} />}
        {...props}
      >
        {children}
        {appearance === "underline" ? <TabsIndicator /> : null}
      </BaseTabs.List>
      <BaseScrollArea.Scrollbar
        orientation="horizontal"
        render={<ScrollAreaScrollbar visibility="auto" magnitude="thin" />}
      >
        <BaseScrollArea.Thumb render={<ScrollAreaThumb />} />
      </BaseScrollArea.Scrollbar>
    </BaseScrollArea.Root>
  );
}
