import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type * as React from "react";

import { tabsPanelVariants } from "./variants";

export type TabsPanelProps = Omit<
  React.ComponentProps<typeof BaseTabs.Panel>,
  "className" | "style"
>;

/** Content shown when the `Tab` of the matching `value` is active. */
export function TabsPanel(props: TabsPanelProps) {
  return <BaseTabs.Panel className={tabsPanelVariants()} {...props} />;
}
