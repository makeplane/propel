import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type TabsVariantProps, tabsVariants } from "./variants";

export type { TabsAppearance } from "./variants";

export type TabsProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  TabsVariantProps;

/**
 * Root of a tab set — a single styled `<div>`. Groups a `TabsList` of `Tab`s with their
 * `TabsPanel`s. Base-UI-agnostic: the ready-made `components/tabs` grafts the Base UI `Tabs.Root`
 * behavior (`<BaseTabs.Root render={<Tabs/>}/>`) and shares the set's `appearance` via context.
 */
export function Tabs({ appearance, render, ...props }: TabsProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: tabsVariants({ appearance }) };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
