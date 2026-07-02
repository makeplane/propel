import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";

import { OverlayTitle } from "../../internal/overlay-title";

export type AlertDialogTitleProps = Omit<BaseAlertDialog.Title.Props, "className" | "style">;

/**
 * The accessible title for the alert dialog. Base UI links it to the popup via `aria-labelledby`;
 * the shared `internal` overlay heading (`magnitude="lg"`) supplies the styling.
 */
export function AlertDialogTitle(props: AlertDialogTitleProps) {
  return <BaseAlertDialog.Title {...props} render={<OverlayTitle magnitude="lg" />} />;
}
