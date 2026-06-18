import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import { TabsVariantContext } from "./tabs-context";
import { tabVariants } from "./variants";

export type TabProps = Omit<React.ComponentProps<typeof BaseTabs.Tab>, "className" | "style">;

/** A single tab button. `value` ties it to the `TabsPanel` of the same `value`. */
export function Tab({ children, ...props }: TabProps) {
  const variant = React.useContext(TabsVariantContext);
  return (
    <BaseTabs.Tab className={tabVariants({ variant })} {...props}>
      {children}
    </BaseTabs.Tab>
  );
}
