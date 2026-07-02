import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { toastViewportVariants } from "./variants";

export type ToastViewportProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The fixed container that positions queued toasts and acts as the live region. Base-UI-agnostic —
 * graft in `components` via `<BaseToast.Viewport render={<ToastViewport/>}>`.
 */
export function ToastViewport({ render, ...props }: ToastViewportProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: toastViewportVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
