import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type * as React from "react";

import { TabsVariantContext, type TabsVariant } from "./tabs-context";
import { rootVariants } from "./variants";

export type { TabsVariant } from "./tabs-context";

export type TabsProps = Omit<React.ComponentProps<typeof BaseTabs.Root>, "className" | "style"> & {
  /**
   * Visual treatment (Figma variant). `contained` lifts the active tab onto a raised card inside a
   * pill; `underline` slides a dark bar under it. Required, with no silent default, like the other
   * essential axes (e.g. Switch `magnitude`).
   */
  variant: TabsVariant;
};

/**
 * Root of a tab set. Groups a `TabsList` of `Tab`s with their `TabsPanel`s and tracks which tab is
 * active.
 */
export function Tabs({ variant, ...props }: TabsProps) {
  return (
    <TabsVariantContext.Provider value={variant}>
      <BaseTabs.Root className={rootVariants({ variant })} {...props} />
    </TabsVariantContext.Provider>
  );
}
