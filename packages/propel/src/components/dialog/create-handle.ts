import { Dialog as BaseDialog } from "@base-ui/react/dialog";

/**
 * Base UI's detached-handle API, flattened to the family name: create a handle outside the React
 * tree, pass it to the root's `handle` prop, and drive the surface imperatively
 * (`handle.open(payload)`) — e.g. one dialog shared by many launch points.
 */
export const createDialogHandle = BaseDialog.createHandle;

export type DialogHandle = ReturnType<typeof createDialogHandle>;
