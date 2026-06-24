import type * as React from "react";

import { buttonLabelVariants } from "./variants";

export type ButtonLabelProps = Omit<React.ComponentPropsWithoutRef<"span">, "className" | "style">;

/**
 * The button's text label. When the root button is `aria-busy` (loading) it dims via the
 * `group-aria-busy:` sibling of the `group` class the root carries, so the spinner reads as the
 * active affordance while the label fades.
 */
export function ButtonLabel(props: ButtonLabelProps) {
  return <span className={buttonLabelVariants()} {...props} />;
}
