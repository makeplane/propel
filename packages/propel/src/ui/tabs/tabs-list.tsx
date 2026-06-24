import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import { TabsVariantContext } from "./tabs-context";
import { tabsListVariants } from "./variants";

export type TabsListProps = Omit<BaseTabs.List.Props, "className" | "style">;

/**
 * The row of tabs (Base UI `Tabs.List`) — a single element. Reads the set's `variant` from context
 * for its chrome. The ready-made `components/tabs` `TabsList` adds the horizontal scroller and the
 * underline `TabsIndicator`.
 */
export function TabsList(props: TabsListProps) {
  const variant = React.useContext(TabsVariantContext);
  return <BaseTabs.List className={tabsListVariants({ variant })} {...props} />;
}
