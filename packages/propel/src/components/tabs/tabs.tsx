import { Tabs as BaseTabs } from "@base-ui/react/tabs";

import { Tabs as TabsElement, type TabsAppearance } from "../../elements/tabs";
import { TabsAppearanceContext } from "./tabs-context";

export type TabsProps = Omit<BaseTabs.Root.Props, "className" | "style"> & {
  /** Whether the set is a contained pill or a flat underline strip. Shared with its parts. */
  appearance: TabsAppearance;
};

/**
 * The ready-made tab set: grafts the Base UI `Tabs.Root` behavior onto the styled `elements/tabs`
 * root and shares its `appearance` with the `TabsList`/`Tab`s inside via context, so you don't
 * repeat it.
 */
export function Tabs({ appearance, ...props }: TabsProps) {
  return (
    <TabsAppearanceContext.Provider value={appearance}>
      <BaseTabs.Root render={<TabsElement appearance={appearance} />} {...props} />
    </TabsAppearanceContext.Provider>
  );
}
