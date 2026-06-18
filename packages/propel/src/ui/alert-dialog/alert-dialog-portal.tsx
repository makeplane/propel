import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";

/**
 * Renders the backdrop and popup into a portal so they escape local stacking contexts. Maps 1:1 to
 * `AlertDialog.Portal`.
 */
export const AlertDialogPortal = BaseAlertDialog.Portal;
