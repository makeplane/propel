import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type ToolbarItemVariantProps, toolbarItemVariants } from "./variants";

export type ToolbarLinkProps = Omit<useRender.ComponentProps<"a">, "className" | "style"> &
  ToolbarItemVariantProps;

/**
 * The styled chrome for a toolbar item that navigates — a single `<a>` sharing the item chrome with
 * `ToolbarButton` (rule 6c: different element, same look). Base-UI-agnostic: graft the toolbar link
 * behavior in `components` via `<BaseToolbar.Link render={<ToolbarLink/>} />`.
 */
export function ToolbarLink({ density, render, ...props }: ToolbarLinkProps) {
  const defaultProps: useRender.ElementProps<"a"> = {
    className: toolbarItemVariants({ density }),
  };
  return useRender({ defaultTagName: "a", render, props: mergeProps(defaultProps, props) });
}
