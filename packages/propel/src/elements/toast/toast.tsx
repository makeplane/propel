import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { toastVariants } from "./variants";

export type ToastProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled floating-card surface of a single toast. Base-UI-agnostic — graft the toast
 * swipe/dismiss behavior in `components` via `<BaseToast.Root render={<Toast/>}>`.
 */
export function Toast({ render, ...props }: ToastProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: toastVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
