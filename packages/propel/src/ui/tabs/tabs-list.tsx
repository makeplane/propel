import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cx } from "class-variance-authority";
import * as React from "react";

import { TabsVariantContext } from "./tabs-context";
import { TabsIndicator } from "./tabs-indicator";
import { tabsListVariants } from "./variants";

export type TabsListProps = Omit<BaseTabs.List.Props, "className" | "style">;

/**
 * The row of tabs (Base UI `Tabs.List`). Renders the active-tab `TabsIndicator` for the underline
 * variant.
 */
export function TabsList({ children, ...props }: TabsListProps) {
  const variant = React.useContext(TabsVariantContext);
  return (
    <BaseTabs.List
      className={cx(tabsListVariants({ variant }), "overscroll-x-contain outline-none")}
      {...props}
    >
      {children}
      {variant === "underline" ? <TabsIndicator /> : null}
    </BaseTabs.List>
  );
}
