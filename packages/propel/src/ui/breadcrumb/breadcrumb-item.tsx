import type * as React from "react";

import { crumbItemVariants } from "./variants";

export type BreadcrumbItemProps = Omit<React.ComponentProps<"li">, "className" | "style">;

/** One step in the trail: a list item holding a link, page, or dropdown crumb. */
export function BreadcrumbItem(props: BreadcrumbItemProps) {
  return <li className={crumbItemVariants()} {...props} />;
}
