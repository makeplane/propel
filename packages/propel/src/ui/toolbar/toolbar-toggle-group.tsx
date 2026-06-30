import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { toolbarToggleGroupVariants } from "./variants";

export type ToolbarToggleGroupProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * A set of `ToolbarToggle`s that share state. Renders a `<div>` by default and bakes in only the
 * cluster layout, keeping `ui/toolbar` independent of the ToggleGroup primitive: a composition
 * grafts the shared-state behavior on by rendering it as a toggle group — `render={<ToggleGroup
 * />}` (the styled div stays the outer element).
 */
export function ToolbarToggleGroup({ render, ...props }: ToolbarToggleGroupProps) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps({ className: toolbarToggleGroupVariants() }, props),
  });
}
