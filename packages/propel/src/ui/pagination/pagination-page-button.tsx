import type * as React from "react";

import { paginationPageButtonVariants } from "./variants";

export type PaginationPageButtonProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "className" | "style"
> & {
  /** The page number to render (or a loading spinner). */
  children?: React.ReactNode;
};

/**
 * A styled page-number button. The current page is marked `aria-current="page"`, which the cva keys
 * the pressed/selected fill off of; pass the page number (or a loading spinner) as `children` and
 * wire `aria-current`/`onClick` through props.
 */
export function PaginationPageButton(props: PaginationPageButtonProps) {
  return <button type="button" className={paginationPageButtonVariants()} {...props} />;
}
