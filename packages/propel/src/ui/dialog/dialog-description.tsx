import { Dialog as BaseDialog } from "@base-ui/react/dialog";

import { dialogDescriptionVariants } from "./variants";

export type DialogDescriptionProps = Omit<BaseDialog.Description.Props, "className" | "style">;

/**
 * The supporting description for the dialog. Base UI links it to the popup via `aria-describedby`.
 * Maps 1:1 to `Dialog.Description`.
 */
export function DialogDescription(props: DialogDescriptionProps) {
  return <BaseDialog.Description className={dialogDescriptionVariants()} {...props} />;
}
