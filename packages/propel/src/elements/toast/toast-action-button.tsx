import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { toastActionVariants } from "./variants";

export type ToastActionButtonProps = Omit<
  useRender.ComponentProps<"button">,
  "className" | "style"
>;

/**
 * A plain action button for the inline-start `ToastActionGroup` cluster. Shares the toast
 * action-button styling with `ToastAction`, but unlike `ToastAction` it does not participate in
 * Base UI's toast focus management or dismiss the toast — use it for secondary actions (e.g. Undo)
 * that should not close the toast. Defaults to `type="button"` so it never submits a form.
 */
export function ToastActionButton({ render, ...props }: ToastActionButtonProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    type: "button",
    className: toastActionVariants(),
  };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
