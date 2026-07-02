import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type ToolbarInputVariantProps, toolbarInputVariants } from "./variants";

export type ToolbarInputProps = Omit<useRender.ComponentProps<"input">, "className" | "style"> &
  ToolbarInputVariantProps;

/**
 * The styled inline text input for a toolbar (a miniature field on the shared control surface,
 * density-matched to the items). Base-UI-agnostic — graft in `components` via `<BaseToolbar.Input
 * render={<ToolbarInput density=… />} />`.
 */
export function ToolbarInput({ density, render, ...props }: ToolbarInputProps) {
  const defaultProps: useRender.ElementProps<"input"> = {
    className: toolbarInputVariants({ density }),
  };
  return useRender({ defaultTagName: "input", render, props: mergeProps(defaultProps, props) });
}
