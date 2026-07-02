import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { toastDescriptionVariants } from "./variants";

export type ToastDescriptionProps = Omit<useRender.ComponentProps<"p">, "className" | "style">;

/**
 * The supporting description for the toast. Base-UI-agnostic — graft in `components` via
 * `<BaseToast.Description render={<ToastDescription/>}>`.
 */
export function ToastDescription({ render, ...props }: ToastDescriptionProps) {
  const defaultProps: useRender.ElementProps<"p"> = { className: toastDescriptionVariants() };
  return useRender({ defaultTagName: "p", render, props: mergeProps(defaultProps, props) });
}
