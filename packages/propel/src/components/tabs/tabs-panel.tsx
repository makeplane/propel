import { Tabs as BaseTabs } from "@base-ui/react/tabs";

import { TabsPanel as TabsPanelElement } from "../../elements/tabs";

export type TabsPanelProps = Omit<BaseTabs.Panel.Props, "className" | "style">;

/**
 * The ready-made tab panel: grafts the Base UI `Tabs.Panel` behavior (shown when the `Tab` of the
 * matching `value` is active) onto the styled `elements/tabs` panel.
 */
export function TabsPanel(props: TabsPanelProps) {
  return <BaseTabs.Panel render={<TabsPanelElement />} {...props} />;
}
