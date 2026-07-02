import { Dialog as BaseDialog } from "@base-ui/react/dialog";

import { OverlayTitle } from "../../internal/overlay-title";

export type DialogTitleProps = Omit<BaseDialog.Title.Props, "className" | "style">;

/**
 * The accessible title for the dialog: Base UI's `Dialog.Title` behavior (links to the popup via
 * `aria-labelledby`) grafted onto the shared `OverlayTitle` chrome at `magnitude="lg"` (rule 4a).
 */
export function DialogTitle(props: DialogTitleProps) {
  return <BaseDialog.Title {...props} render={<OverlayTitle magnitude="lg" />} />;
}
