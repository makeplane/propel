import { Tabs as BaseTabs } from "@base-ui/react/tabs";

import { tabsIndicatorVariants } from "./variants";

export type TabsIndicatorProps = Omit<BaseTabs.Indicator.Props, "className" | "style">;

/**
 * The underline bar. Surfaced for callers composing a custom list; the built-in `TabsList` already
 * renders it for the `underline` appearance.
 */
export function TabsIndicator(props: TabsIndicatorProps) {
  return <BaseTabs.Indicator className={tabsIndicatorVariants()} {...props} />;
}
