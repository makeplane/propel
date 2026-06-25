import type * as React from "react";

import { badgeDismissVariants } from "./variants";

export type BadgeDismissProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "className" | "style"
> & {
  /** Accessible name — required because the control is an icon (e.g. "Remove label"). */
  "aria-label": string;
  /** The dismiss glyph to render (e.g. a Lucide `X`), sized to the badge's `--node-size`. */
  children?: React.ReactNode;
};

/**
 * The optional dismiss/remove action at the badge's inline-end. A button that sizes its single
 * child to the badge's `--node-size` and inherits the tone's text color; pass the glyph as
 * `children`. Because the content is an icon, an `aria-label` is required.
 */
export function BadgeDismiss({ children, type = "button", ...props }: BadgeDismissProps) {
  return (
    <button type={type} className={badgeDismissVariants()} {...props}>
      {children}
    </button>
  );
}
