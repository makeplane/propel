import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type * as React from "react";

export type DialogTriggerProps = Omit<
  React.ComponentProps<typeof BaseDialog.Trigger>,
  "className" | "style"
>;

/**
 * The button that opens the dialog. Base UI manages `aria-haspopup`/`aria-expanded` and focus
 * restoration when the dialog closes. Maps 1:1 to `Dialog.Trigger`.
 */
export function DialogTrigger(props: DialogTriggerProps) {
  return <BaseDialog.Trigger {...props} />;
}
