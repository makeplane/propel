import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import {
  type ContextMenuSubmenuTriggerVariantProps,
  contextMenuSubmenuTriggerVariants,
} from "./variants";

export type { ContextMenuSubmenuTriggerTone } from "./variants";

export type ContextMenuSubmenuTriggerProps = Omit<
  useRender.ComponentProps<"div">,
  "className" | "style"
> &
  ContextMenuSubmenuTriggerVariantProps;

/**
 * The styled row that opens a submenu. Base-UI-agnostic — graft the submenu-trigger behavior in
 * `components` via `<BaseContextMenu.SubmenuTrigger render={<ContextMenuSubmenuTrigger
 * tone="neutral"/>} />`.
 */
export function ContextMenuSubmenuTrigger({
  tone,
  render,
  ...props
}: ContextMenuSubmenuTriggerProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: contextMenuSubmenuTriggerVariants({ tone }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
