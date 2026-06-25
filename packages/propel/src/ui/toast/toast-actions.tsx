import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { toastActionsVariants } from "./variants";

export type ToastActionsProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The full-width action row beneath a toast's text and optional progress bar. Holds the
 * inline-start `ToastActionGroup` cluster and an optional inline-end `ToastAction`.
 */
export function ToastActions({ render, ...props }: ToastActionsProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: toastActionsVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
