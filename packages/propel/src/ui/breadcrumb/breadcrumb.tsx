import type * as React from "react";

import { crumbListVariants } from "./variants";

export type BreadcrumbProps = Omit<React.ComponentProps<"nav">, "className" | "style">;

/** Breadcrumb trail: a `<nav aria-label="Breadcrumb">` wrapping an ordered list. */
export function Breadcrumb({ children, ...props }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" {...props}>
      <ol className={crumbListVariants()}>{children}</ol>
    </nav>
  );
}
