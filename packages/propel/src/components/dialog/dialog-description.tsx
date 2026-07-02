import { Dialog as BaseDialog } from "@base-ui/react/dialog";

import { OverlayDescription } from "../../internal/overlay-description";

export type DialogDescriptionProps = Omit<BaseDialog.Description.Props, "className" | "style">;

/**
 * The supporting description for the dialog: Base UI's `Dialog.Description` behavior (links to the
 * popup via `aria-describedby`) grafted onto the shared `OverlayDescription` chrome at
 * `magnitude="lg"` (rule 4a).
 */
export function DialogDescription(props: DialogDescriptionProps) {
  return <BaseDialog.Description {...props} render={<OverlayDescription magnitude="lg" />} />;
}
