import type * as React from "react";

import { paginationPageButtonVariants } from "./variants";

export type PaginationPageButtonProps = Omit<
  React.ComponentProps<"button">,
  "className" | "style"
> & {
  /** Whether this button represents the current page (renders the pressed/selected fill). */
  current: boolean;
};

/**
 * A styled page-number button. Applies `paginationPageButtonVariants({ current })`; pass the page
 * number (or a loading spinner) as `children` and wire `aria-current`/`onClick` through props.
 */
export function PaginationPageButton({ current, ...props }: PaginationPageButtonProps) {
  return <button type="button" className={paginationPageButtonVariants({ current })} {...props} />;
}
