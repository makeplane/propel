import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { alertDialogCloseVariants } from "./variants";

export type AlertDialogCloseProps = Omit<useRender.ComponentProps<"button">, "className" | "style">;

/**
 * A ghost button that closes the alert dialog. Base-UI-agnostic — graft the close behavior in
 * `components` via `<BaseAlertDialog.Close render={<AlertDialogClose/>} />`.
 */
export function AlertDialogClose({ render, ...props }: AlertDialogCloseProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    className: alertDialogCloseVariants(),
  };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
