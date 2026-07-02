import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import {
  type ToolbarMenuTriggerButtonVariantProps,
  toolbarMenuTriggerButtonVariants,
} from "./variants";

export type ToolbarMenuTriggerButtonProps = Omit<
  useRender.ComponentProps<"button">,
  "className" | "style"
> &
  ToolbarMenuTriggerButtonVariantProps;

/**
 * The styled chrome for a toolbar menu trigger: a `<button>` that pairs a text label slot with a
 * disclosure indicator, with density-aware sizing. Base-UI-agnostic: graft the trigger behavior in
 * `components` via `<BaseToolbar.Button render={<ToolbarMenuTriggerButton/>} />`.
 */
export function ToolbarMenuTriggerButton({
  density,
  render,
  ...props
}: ToolbarMenuTriggerButtonProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    className: toolbarMenuTriggerButtonVariants({ density }),
  };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
