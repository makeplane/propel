import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { alertDialogPopupVariants } from "./variants";

export type AlertDialogPopupProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The centered card that holds the alert content. Base-UI-agnostic — graft the popup behavior in
 * `components` via `<BaseAlertDialog.Popup render={<AlertDialogPopup/>} />`.
 */
export function AlertDialogPopup({ render, ...props }: AlertDialogPopupProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: alertDialogPopupVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
