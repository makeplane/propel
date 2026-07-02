import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { underlineLabelVariants } from "./variants";

export type TabUnderlineLabelProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The label row of an `underline`-appearance tab: a rounded, padded box that tints and fills on
 * hover/active via the tab's `group/tab` state. Sits inside a `Tab`; owns the styled `<span>` so
 * consumers never touch the underline cva directly.
 */
export function TabUnderlineLabel({ render, ...props }: TabUnderlineLabelProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: underlineLabelVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
