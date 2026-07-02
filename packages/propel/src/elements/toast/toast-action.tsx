import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { toastActionVariants } from "./variants";

export type ToastActionProps = Omit<useRender.ComponentProps<"button">, "className" | "style">;

/**
 * The styled action button that participates in the toast's focus management. Base-UI-agnostic —
 * graft in `components` via `<BaseToast.Action render={<ToastAction/>}>`.
 */
export function ToastAction({ render, ...props }: ToastActionProps) {
  const defaultProps: useRender.ElementProps<"button"> = { className: toastActionVariants() };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
