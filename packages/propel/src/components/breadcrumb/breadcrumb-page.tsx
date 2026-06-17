import { cx } from "class-variance-authority";
import type * as React from "react";

import { crumbVariants } from "./breadcrumb-context";

export type BreadcrumbPageProps = Omit<React.ComponentProps<"span">, "className" | "style">;

/** The current page — the last, non-navigable crumb. */
export function BreadcrumbPage(props: BreadcrumbPageProps) {
  return (
    <span
      aria-current="page"
      className={cx(crumbVariants({ interactive: false }), "text-primary")}
      {...props}
    />
  );
}
