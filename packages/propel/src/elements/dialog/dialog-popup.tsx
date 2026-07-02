import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type DialogPopupVariantProps, dialogPopupVariants } from "./variants";

export type { DialogPopupMagnitude } from "./variants";

export type DialogPopupProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  DialogPopupVariantProps;

/**
 * The centered card that holds the dialog content. Base-UI-agnostic — graft the dialog behavior in
 * `components` via `<BaseDialog.Popup render={<DialogPopup magnitude="sm" />} />`.
 *
 * `magnitude` sets the popup width (`sm` = 320 px, `md` = 384 px, `lg` = 512 px) and is required so
 * every call-site is explicit.
 */
export function DialogPopup({ magnitude, render, ...props }: DialogPopupProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: dialogPopupVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
