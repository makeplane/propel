import type * as React from "react";

import { numberFieldButtonIconVariants } from "./variants";

export type NumberFieldButtonIconProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The icon slot inside a stepper button (`NumberFieldDecrement` or `NumberFieldIncrement`). Sizes
 * its single child to the button's `--node-size` (set by the button's `magnitude`), so callers pass
 * a bare icon with no size class. Decorative — the button carries the accessible name.
 */
export function NumberFieldButtonIcon(props: NumberFieldButtonIconProps) {
  return <span aria-hidden className={numberFieldButtonIconVariants()} {...props} />;
}
