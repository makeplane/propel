import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { toolbarMenuTriggerLabelVariants } from "./variants";

export type ToolbarMenuTriggerLabelProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The text label of a toolbar menu trigger (e.g. "Text", "Aa"). Its own styled `<span>` so the
 * trigger button holds no raw typography — the button is the control, this is its label region.
 * Base-UI-agnostic.
 */
export function ToolbarMenuTriggerLabel({ render, ...props }: ToolbarMenuTriggerLabelProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: toolbarMenuTriggerLabelVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
