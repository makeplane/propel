import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";

import { OverlayDescription } from "../../internal/overlay-description";

export type AlertDialogDescriptionProps = Omit<
  BaseAlertDialog.Description.Props,
  "className" | "style"
>;

/**
 * The supporting description for the alert dialog. Base UI links it to the popup via
 * `aria-describedby`; the shared `internal` overlay copy (`magnitude="lg"`) supplies the styling.
 */
export function AlertDialogDescription(props: AlertDialogDescriptionProps) {
  return <BaseAlertDialog.Description {...props} render={<OverlayDescription magnitude="lg" />} />;
}
