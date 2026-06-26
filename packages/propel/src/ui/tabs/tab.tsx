import { Tabs as BaseTabs } from "@base-ui/react/tabs";

import { type TabVariantProps, tabVariants } from "./variants";

export type TabProps = Omit<BaseTabs.Tab.Props, "className" | "style"> & TabVariantProps;

/** A single tab button. `value` ties it to the `TabsPanel` of the same `value`. */
export function Tab({ appearance, ...props }: TabProps) {
  return <BaseTabs.Tab className={tabVariants({ appearance })} {...props} />;
}
