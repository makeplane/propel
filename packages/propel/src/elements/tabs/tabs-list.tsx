import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type TabsListVariantProps, tabsListVariants } from "./variants";

export type TabsListProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  TabsListVariantProps;

/**
 * The row of tabs — a single styled `<div>`. Base-UI-agnostic: the ready-made `components/tabs`
 * grafts the Base UI `Tabs.List` behavior (`<BaseTabs.List render={<TabsList/>}/>`) and adds the
 * horizontal scroller and the underline `TabsIndicator`.
 */
export function TabsList({ appearance, render, ...props }: TabsListProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: tabsListVariants({ appearance }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
