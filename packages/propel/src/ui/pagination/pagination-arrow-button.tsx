import type * as React from "react";

import { type PaginationMagnitude, arrowButtonVariants } from "./variants";

export type PaginationArrowButtonProps = Omit<
  React.ComponentProps<"button">,
  "className" | "style"
> & {
  /** Size of the slot. Pass the icon as `children`; it is sized via `[&>svg]`. */
  magnitude: PaginationMagnitude;
};

/**
 * A styled prev/next arrow button. Applies `arrowButtonVariants({ magnitude })`; pass the
 * (directional, RTL-mirrored) arrow icon as `children` and wire `aria-label`/`disabled`/`onClick`
 * through props.
 */
export function PaginationArrowButton({ magnitude, ...props }: PaginationArrowButtonProps) {
  return <button type="button" className={arrowButtonVariants({ magnitude })} {...props} />;
}
