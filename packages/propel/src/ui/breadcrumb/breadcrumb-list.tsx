import type * as React from "react";

import { breadcrumbListVariants } from "./variants";

export type BreadcrumbListProps = Omit<React.ComponentProps<"ol">, "className" | "style">;

/** The ordered list of crumbs inside a `Breadcrumb` landmark. */
export function BreadcrumbList(props: BreadcrumbListProps) {
  return <ol className={breadcrumbListVariants()} {...props} />;
}
