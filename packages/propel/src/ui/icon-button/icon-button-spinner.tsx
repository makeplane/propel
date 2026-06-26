import type * as React from "react";

import { iconButtonSpinnerVariants } from "./variants";

export type IconButtonSpinnerProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The loading indicator shown in place of the icon while the button is busy. A single spinning
 * glyph sized to the root's inherited `--node-size`. Decorative (the root carries `aria-busy`), so
 * it is `aria-hidden`. Bakes no glyph — pass the spinner as `children` (the ready-made `IconButton`
 * passes a `LoaderCircle`).
 */
export function IconButtonSpinner(props: IconButtonSpinnerProps) {
  return <span aria-hidden className={iconButtonSpinnerVariants()} {...props} />;
}
