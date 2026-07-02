import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { tabsPanelVariants } from "./variants";

export type TabsPanelProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * Content shown when the `Tab` of the matching `value` is active — a single styled `<div>`.
 * Base-UI-agnostic: the ready-made `components/tabs` grafts the Base UI `Tabs.Panel` behavior via
 * `<BaseTabs.Panel render={<TabsPanel/>}/>`.
 */
export function TabsPanel({ render, ...props }: TabsPanelProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: tabsPanelVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
