import type * as React from "react";

import { buttonSpinnerVariants } from "./variants";

export type ButtonSpinnerProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /**
   * The spinner glyph to render (e.g. a Lucide `LoaderCircle`), sized to the button's
   * `--node-size`.
   */
  children?: React.ReactNode;
};

/**
 * The loading indicator shown in place of the inline-start node while the button is busy. A pure
 * slot: it sizes its single child to the button's `--node-size` and spins it via `animate-spin`,
 * but bakes no glyph — callers pass the spinner icon as `children`. Decorative (the root carries
 * `aria-busy`), so it is `aria-hidden`.
 */
export function ButtonSpinner(props: ButtonSpinnerProps) {
  return <span aria-hidden className={buttonSpinnerVariants()} {...props} />;
}
