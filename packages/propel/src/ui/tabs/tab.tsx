import { Tabs as BaseTabs } from "@base-ui/react/tabs";

import { type TabsVariant, tabVariants } from "./variants";

export type TabProps = Omit<BaseTabs.Tab.Props, "className" | "style"> & {
  /** The set's visual treatment, matching the `Tabs` root. */
  variant: TabsVariant;
};

/** A single tab button. `value` ties it to the `TabsPanel` of the same `value`. */
export function Tab({ variant, ...props }: TabProps) {
  return <BaseTabs.Tab className={tabVariants({ variant })} {...props} />;
}
