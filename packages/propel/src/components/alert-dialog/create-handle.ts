import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";

/**
 * Base UI's detached-handle API, flattened to the family name: create a handle outside the React
 * tree, pass it to the root's `handle` prop, and drive the surface imperatively
 * (`handle.open(payload)`) — e.g. one alertdialog shared by many launch points.
 */
export const createAlertDialogHandle = BaseAlertDialog.createHandle;

export type AlertDialogHandle = ReturnType<typeof createAlertDialogHandle>;
