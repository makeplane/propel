import type * as React from "react";

import { Tabs as TabsElement, type TabsProps as TabsElementProps } from "../../ui/tabs";
import { TabsVariantContext } from "./tabs-context";

export type TabsProps = TabsElementProps & {
  children?: React.ReactNode;
};

/**
 * The ready-made tab set: shares its `variant` with the `TabsList`/`Tab`s inside via context,
 * composed around the single-element `ui/tabs` root.
 */
export function Tabs({ variant, children, ...props }: TabsProps) {
  return (
    <TabsVariantContext.Provider value={variant}>
      <TabsElement variant={variant} {...props}>
        {children}
      </TabsElement>
    </TabsVariantContext.Provider>
  );
}
