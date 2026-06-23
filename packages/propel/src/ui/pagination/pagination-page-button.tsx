import type * as React from "react";

import { type PaginationMagnitude, pageButtonVariants } from "./variants";

export type PaginationPageButtonProps = Omit<
  React.ComponentProps<"button">,
  "className" | "style"
> & {
  /** Whether this button represents the current page (renders the pressed/selected fill). */
  current: boolean;
  /** Size of the slot. */
  magnitude: PaginationMagnitude;
};

/**
 * A styled page-number button. Applies `pageButtonVariants({ current, magnitude })`; pass the page
 * number (or a loading spinner) as `children` and wire `aria-current`/`onClick` through props.
 */
export function PaginationPageButton({ current, magnitude, ...props }: PaginationPageButtonProps) {
  return <button type="button" className={pageButtonVariants({ current, magnitude })} {...props} />;
}
