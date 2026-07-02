import { Tabs as BaseTabs } from "@base-ui/react/tabs";

import { TabsIndicator as TabsIndicatorElement } from "../../elements/tabs";

export type TabsIndicatorProps = Omit<BaseTabs.Indicator.Props, "className" | "style">;

/**
 * The ready-made active-tab underline: grafts the Base UI `Tabs.Indicator` behavior (which tracks
 * the active tab via the `--active-tab-*` CSS vars) onto the styled `elements/tabs` indicator. The
 * built-in `TabsList` renders it for the `underline` appearance; surfaced for custom lists.
 */
export function TabsIndicator(props: TabsIndicatorProps) {
  return <BaseTabs.Indicator render={<TabsIndicatorElement />} {...props} />;
}
