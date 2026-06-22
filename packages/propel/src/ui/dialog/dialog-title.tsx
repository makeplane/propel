import { Dialog as BaseDialog } from "@base-ui/react/dialog";

import { dialogTitleVariants } from "./variants";

export type DialogTitleProps = Omit<BaseDialog.Title.Props, "className" | "style">;

/**
 * The accessible title for the dialog. Base UI links it to the popup via `aria-labelledby`. Maps
 * 1:1 to `Dialog.Title`.
 */
export function DialogTitle(props: DialogTitleProps) {
  return <BaseDialog.Title className={dialogTitleVariants()} {...props} />;
}
