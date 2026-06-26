import { Tabs as BaseTabs } from "@base-ui/react/tabs";

import { type TabsListVariantProps, tabsListVariants } from "./variants";

export type TabsListProps = Omit<BaseTabs.List.Props, "className" | "style"> & TabsListVariantProps;

/**
 * The row of tabs (Base UI `Tabs.List`) — a single element. The ready-made `components/tabs`
 * `TabsList` adds the horizontal scroller and the underline `TabsIndicator`.
 */
export function TabsList({ appearance, ...props }: TabsListProps) {
  return <BaseTabs.List className={tabsListVariants({ appearance })} {...props} />;
}
