import type * as React from "react";

import { breadcrumbPageVariants } from "./variants";

export type BreadcrumbPageProps = Omit<React.ComponentProps<"span">, "className" | "style">;

/** The current page — the last, non-navigable crumb. */
export function BreadcrumbPage(props: BreadcrumbPageProps) {
  return <span aria-current="page" className={breadcrumbPageVariants()} {...props} />;
}
