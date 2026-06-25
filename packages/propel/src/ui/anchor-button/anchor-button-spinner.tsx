import type * as React from "react";

import { anchorButtonSpinnerVariants } from "./variants";

export type AnchorButtonSpinnerProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** The spinner glyph to render (e.g. a Lucide `LoaderCircle`), sized to the root's `--node-size`. */
  children?: React.ReactNode;
};

/**
 * The pending-navigation indicator shown in place of the inline-start node while a navigation is in
 * flight (e.g. a router holding on the link while the next route's data/code loads). A pure slot
 * sized to `--node-size`; callers pass the spinner icon as `children`. Decorative (the root carries
 * `aria-busy`), so it is `aria-hidden`.
 */
export function AnchorButtonSpinner(props: AnchorButtonSpinnerProps) {
  return <span aria-hidden className={anchorButtonSpinnerVariants()} {...props} />;
}
