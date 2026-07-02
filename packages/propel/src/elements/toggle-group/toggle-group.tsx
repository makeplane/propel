import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { toggleGroupVariants } from "./variants";

export type ToggleGroupProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled connected/segmented container around `Toggle`s — shared outer border, dividers between
 * items, and clipped corners. Base-UI-agnostic — graft the single/multi-select state + roving focus
 * in `components` via `<BaseToggleGroup render={<ToggleGroup/>} />`.
 */
export function ToggleGroup({ render, ...props }: ToggleGroupProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: toggleGroupVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
