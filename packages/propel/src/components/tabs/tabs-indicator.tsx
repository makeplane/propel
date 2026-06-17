import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type * as React from "react";

import { tabsIndicatorVariants } from "./tabs-context";

export type TabsIndicatorProps = Omit<
  React.ComponentProps<typeof BaseTabs.Indicator>,
  "className" | "render" | "style"
>;

/**
 * The underline bar. Surfaced for callers composing a custom list; the built-in `TabsList` already
 * renders it for the `underline` variant.
 */
export function TabsIndicator(props: TabsIndicatorProps) {
  return <BaseTabs.Indicator className={tabsIndicatorVariants()} {...props} />;
}
