import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type ToolbarVariantProps, toolbarVariants } from "./variants";

export type { ToolbarDensity, ToolbarElevation } from "./variants";

export type ToolbarProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  ToolbarVariantProps;

/**
 * The styled toolbar row — a single `<div>`. Base-UI-agnostic: graft the toolbar behavior in
 * `components` via `<BaseToolbar.Root render={<Toolbar/>} />`. The density-sharing behavior (so the
 * controls inside pick up the toolbar's `density`) is the ready-made `components/toolbar`.
 */
export function Toolbar({ elevation, density, render, ...props }: ToolbarProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: toolbarVariants({ density, elevation }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
