import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { toastTitleVariants } from "./variants";

export type ToastTitleProps = Omit<useRender.ComponentProps<"h2">, "className" | "style">;

/**
 * The accessible title that labels the toast. Base-UI-agnostic — graft in `components` via
 * `<BaseToast.Title render={<ToastTitle/>}>`.
 */
export function ToastTitle({ render, ...props }: ToastTitleProps) {
  const defaultProps: useRender.ElementProps<"h2"> = { className: toastTitleVariants() };
  return useRender({ defaultTagName: "h2", render, props: mergeProps(defaultProps, props) });
}
