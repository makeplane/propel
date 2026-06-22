import type * as React from "react";

import { pageButtonVariants } from "./variants";

export type PaginationPageButtonProps = Omit<
  React.ComponentProps<"button">,
  "className" | "style"
> & {
  /** Whether this button represents the current page (renders the pressed/selected fill). */
  current: boolean;
};

/**
 * A styled page-number button. Applies `pageButtonVariants({ current })`; pass the page number (or
 * a loading spinner) as `children` and wire `aria-current`/`onClick` through props.
 */
export function PaginationPageButton({ current, ...props }: PaginationPageButtonProps) {
  return <button type="button" className={pageButtonVariants({ current })} {...props} />;
}
