import type * as React from "react";

import { Tabs as TabsElement, type TabsProps as TabsElementProps } from "../../ui/tabs";
import { TabsAppearanceContext } from "./tabs-context";

export type TabsProps = TabsElementProps & {
  children?: React.ReactNode;
};

/**
 * The ready-made tab set: shares its `appearance` with the `TabsList`/`Tab`s inside via context,
 * composed around the single-element `ui/tabs` root.
 */
export function Tabs({ appearance, children, ...props }: TabsProps) {
  return (
    <TabsAppearanceContext.Provider value={appearance}>
      <TabsElement appearance={appearance} {...props}>
        {children}
      </TabsElement>
    </TabsAppearanceContext.Provider>
  );
}
