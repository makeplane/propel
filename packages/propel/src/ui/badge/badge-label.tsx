import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { badgeLabelVariants } from "./variants";

export type BadgeLabelProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The badge's text label. Single-line (the pill clips wrapping); sits between an optional leading
 * `BadgeIcon` and a trailing `BadgeDismiss`.
 */
export function BadgeLabel({ render, ...props }: BadgeLabelProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: badgeLabelVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
