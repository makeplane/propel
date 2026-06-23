import { LoaderCircle } from "lucide-react";
import type * as React from "react";

import { iconButtonSpinnerVariants } from "./variants";

export type IconButtonSpinnerProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The loading indicator shown in place of the icon while the button is busy. A single spinning
 * glyph sized to the root's inherited `--node-size`. Decorative (the root carries `aria-busy`), so
 * it is `aria-hidden`. Defaults to a spinner; pass `children` to use a different glyph.
 */
export function IconButtonSpinner({ children, ...props }: IconButtonSpinnerProps) {
  return (
    <span aria-hidden className={iconButtonSpinnerVariants()} {...props}>
      {children ?? <LoaderCircle className="animate-spin" />}
    </span>
  );
}
