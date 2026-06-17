import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cx } from "class-variance-authority";
import * as React from "react";

import { scrollbarClass, scrollbarThumbClass } from "../../internal/scrollbar";
import { tabsListVariants, TabsVariantContext } from "./tabs-context";
import { TabsIndicator } from "./tabs-indicator";

export type TabsListProps = Omit<
  React.ComponentProps<typeof BaseTabs.List>,
  "className" | "render" | "style"
>;

/** The row of tabs. Renders the active-tab `TabsIndicator` for the underline variant. */
export function TabsList({ children, ...props }: TabsListProps) {
  const variant = React.useContext(TabsVariantContext);
  return (
    <BaseScrollArea.Root className="relative max-w-full">
      <BaseTabs.List
        render={<BaseScrollArea.Viewport />}
        className={cx(tabsListVariants({ variant }), "overscroll-x-contain outline-none")}
        {...props}
      >
        {children}
        {variant === "underline" ? <TabsIndicator /> : null}
      </BaseTabs.List>
      <BaseScrollArea.Scrollbar orientation="horizontal" className={scrollbarClass}>
        <BaseScrollArea.Thumb className={scrollbarThumbClass} />
      </BaseScrollArea.Scrollbar>
    </BaseScrollArea.Root>
  );
}
