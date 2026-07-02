import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { tabsIndicatorVariants } from "./variants";

export type TabsIndicatorProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The underline bar — a single styled `<span>`. Base-UI-agnostic: the ready-made `components/tabs`
 * grafts the Base UI `Tabs.Indicator` behavior (`<BaseTabs.Indicator render={<TabsIndicator/>}/>`);
 * the built-in `TabsList` already renders it for the `underline` appearance.
 */
export function TabsIndicator({ render, ...props }: TabsIndicatorProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: tabsIndicatorVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
