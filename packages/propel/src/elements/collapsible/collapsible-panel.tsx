import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { collapsiblePanelVariants } from "./variants";

export type CollapsiblePanelProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled collapsible content region. Animates open/closed using Base UI's
 * `--collapsible-panel-height`. Base-UI-agnostic — graft the collapsible behavior in `components`
 * via `<BaseCollapsible.Panel render={<CollapsiblePanel/>} />`.
 */
export function CollapsiblePanel({ render, ...props }: CollapsiblePanelProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: collapsiblePanelVariants(),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
