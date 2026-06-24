import { Tabs as BaseTabs } from "@base-ui/react/tabs";

import { type TabsVariant, rootVariants } from "./variants";

export type { TabsVariant } from "./variants";

export type TabsProps = Omit<BaseTabs.Root.Props, "className" | "style"> & {
  /**
   * Visual treatment (Figma variant). `contained` lifts the active tab onto a raised card inside a
   * pill; `underline` slides a dark bar under it. Required, with no silent default.
   */
  variant: TabsVariant;
};

/**
 * Root of a tab set (Base UI `Tabs.Root`) — a single element. Groups a `TabsList` of `Tab`s with
 * their `TabsPanel`s and tracks the active tab. The variant-sharing context (so the list/tabs pick
 * up the set's `variant`) is the ready-made `components/tabs`.
 */
export function Tabs({ variant, ...props }: TabsProps) {
  return <BaseTabs.Root className={rootVariants({ variant })} {...props} />;
}
