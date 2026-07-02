import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type TabVariantProps, tabVariants } from "./variants";

export type TabProps = Omit<useRender.ComponentProps<"button">, "className" | "style"> &
  TabVariantProps;

/**
 * A single tab button — a styled `<button>`. Base-UI-agnostic: the ready-made `components/tabs`
 * grafts the Base UI `Tabs.Tab` behavior (which ties it to the `TabsPanel` of the same `value`) via
 * `<BaseTabs.Tab render={<Tab/>}/>`.
 */
export function Tab({ appearance, render, ...props }: TabProps) {
  const defaultProps: useRender.ElementProps<"button"> = { className: tabVariants({ appearance }) };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
