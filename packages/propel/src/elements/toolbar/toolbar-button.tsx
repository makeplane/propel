import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type ToolbarItemVariantProps, toolbarItemVariants } from "./variants";

export type ToolbarButtonProps = Omit<useRender.ComponentProps<"button">, "className" | "style"> &
  ToolbarItemVariantProps;

/**
 * The styled chrome for a toolbar action button — a single `<button>`. Base-UI-agnostic: graft the
 * toolbar item behavior in `components` via `<BaseToolbar.Button render={<ToolbarButton/>} />`.
 */
export function ToolbarButton({ density, render, ...props }: ToolbarButtonProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    className: toolbarItemVariants({ density }),
  };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
