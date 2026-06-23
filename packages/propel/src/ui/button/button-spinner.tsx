import { LoaderCircle } from "lucide-react";
import type * as React from "react";

import { buttonSpinnerVariants } from "./variants";

export type ButtonSpinnerProps = Omit<
  React.ComponentPropsWithoutRef<typeof LoaderCircle>,
  "className"
>;

/**
 * The loading indicator shown in place of the inline-start node while the button is busy. Sized to
 * the button's `--node-size` and spun via `animate-spin`. Decorative (the root carries
 * `aria-busy`), so it is `aria-hidden`.
 */
export function ButtonSpinner(props: ButtonSpinnerProps) {
  return <LoaderCircle aria-hidden className={buttonSpinnerVariants()} {...props} />;
}
