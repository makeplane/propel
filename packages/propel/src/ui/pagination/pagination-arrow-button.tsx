import type * as React from "react";

import { arrowButtonVariants } from "./variants";

export type PaginationArrowButtonProps = Omit<
  React.ComponentProps<"button">,
  "className" | "style"
>;

/**
 * A styled prev/next arrow button. Applies `arrowButtonVariants()`; pass the (directional,
 * RTL-mirrored) arrow icon as `children` and wire `aria-label`/`disabled`/`onClick` through props.
 */
export function PaginationArrowButton(props: PaginationArrowButtonProps) {
  return <button type="button" className={arrowButtonVariants()} {...props} />;
}
