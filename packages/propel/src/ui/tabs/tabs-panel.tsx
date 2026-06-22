import { Tabs as BaseTabs } from "@base-ui/react/tabs";

import { tabsPanelVariants } from "./variants";

export type TabsPanelProps = Omit<BaseTabs.Panel.Props, "className" | "style">;

/** Content shown when the `Tab` of the matching `value` is active. */
export function TabsPanel(props: TabsPanelProps) {
  return <BaseTabs.Panel className={tabsPanelVariants()} {...props} />;
}
