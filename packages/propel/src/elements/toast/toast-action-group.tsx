import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { toastActionGroupVariants } from "./variants";

export type ToastActionGroupProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The inline-start cluster of plain action buttons inside a `ToastActions` row. Grows to fill the
 * row so a trailing `ToastAction` pins to the inline-end edge.
 */
export function ToastActionGroup({ render, ...props }: ToastActionGroupProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: toastActionGroupVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
