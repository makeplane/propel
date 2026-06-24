import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type { VariantProps } from "class-variance-authority";

import { dialogPopupVariants } from "./variants";

export type DialogPopupProps = Omit<BaseDialog.Popup.Props, "className" | "style"> &
  Required<Pick<VariantProps<typeof dialogPopupVariants>, "magnitude">>;

/**
 * The centered card that holds the dialog content. Scales and fades on open/close using Base UI's
 * `--transform-origin` and starting/ending transition styles.
 *
 * `magnitude` sets the popup width (`sm` = 320 px, `md` = 384 px, `lg` = 512 px) and is required so
 * every call-site is explicit. Maps 1:1 to `Dialog.Popup`.
 */
export function DialogPopup({ magnitude, ...props }: DialogPopupProps) {
  return <BaseDialog.Popup className={dialogPopupVariants({ magnitude })} {...props} />;
}
