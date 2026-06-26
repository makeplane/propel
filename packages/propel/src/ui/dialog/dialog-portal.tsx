import { Dialog as BaseDialog } from "@base-ui/react/dialog";

export type DialogPortalProps = Omit<BaseDialog.Portal.Props, "className" | "style">;

/**
 * Renders the backdrop and popup into a portal so they escape local stacking contexts. Maps 1:1 to
 * `Dialog.Portal`.
 */
export function DialogPortal(props: DialogPortalProps) {
  return <BaseDialog.Portal {...props} />;
}
