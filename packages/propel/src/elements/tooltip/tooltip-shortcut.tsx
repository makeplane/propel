import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { tooltipShortcutVariants } from "./variants";

export type TooltipShortcutProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * A dimmed caption-scale label for a keyboard-shortcut hint shown to the inline-end of the tooltip
 * content — the Figma "Cmd + K" slot. Omit it for a plain tooltip.
 */
export function TooltipShortcut({ render, ...props }: TooltipShortcutProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: tooltipShortcutVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
