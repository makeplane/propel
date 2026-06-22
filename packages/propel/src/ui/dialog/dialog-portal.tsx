import { Dialog as BaseDialog } from "@base-ui/react/dialog";

/**
 * Renders the backdrop and popup into a portal so they escape local stacking contexts. Maps 1:1 to
 * `Dialog.Portal`.
 */
export const DialogPortal = BaseDialog.Portal;
