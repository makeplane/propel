import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { toastContentVariants } from "./variants";

export type ToastContentProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * A container for the contents of a toast (title, description, actions). Base-UI-agnostic — graft
 * in `components` via `<BaseToast.Content render={<ToastContent/>}>`.
 */
export function ToastContent({ render, ...props }: ToastContentProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: toastContentVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
