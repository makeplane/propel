import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { toastTextGroupVariants } from "./variants";

export type ToastTextGroupProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The tight vertical pairing of `ToastTitle` and `ToastDescription` at the top of a `ToastContent`.
 * Keeps the title and description close together while sitting in the content column's wider rhythm
 * alongside an optional progress bar and action row.
 */
export function ToastTextGroup({ render, ...props }: ToastTextGroupProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: toastTextGroupVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
