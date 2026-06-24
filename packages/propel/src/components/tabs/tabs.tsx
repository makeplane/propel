import type * as React from "react";

import { Tabs as TabsRoot, type TabsProps as TabsRootProps } from "../../ui/tabs";
import { TabsVariantContext } from "./tabs-context";

export type TabsProps = TabsRootProps & {
  children?: React.ReactNode;
};

/**
 * The ready-made tab set: shares its `variant` with the `TabsList`/`Tab`s inside via context,
 * composed around the single-element `ui/tabs` root.
 */
export function Tabs({ variant, children, ...props }: TabsProps) {
  return (
    <TabsVariantContext.Provider value={variant}>
      <TabsRoot variant={variant} {...props}>
        {children}
      </TabsRoot>
    </TabsVariantContext.Provider>
  );
}
