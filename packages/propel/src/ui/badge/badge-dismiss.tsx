import { X } from "lucide-react";
import type * as React from "react";

import { badgeDismissVariants } from "./variants";

export type BadgeDismissProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "className" | "style"
> & {
  /** Accessible name — required because the control is an icon (e.g. "Remove label"). */
  "aria-label": string;
};

/**
 * The optional dismiss/remove action at the badge's inline-end. A button that sizes its single
 * child to the badge's `--node-size` and inherits the tone's text color. Defaults to an X glyph;
 * pass `children` to use a different one. Because the content is an icon, an `aria-label` is
 * required.
 */
export function BadgeDismiss({ children, type = "button", ...props }: BadgeDismissProps) {
  return (
    <button type={type} className={badgeDismissVariants()} {...props}>
      {children ?? <X />}
    </button>
  );
}
