import type * as React from "react";

import { breadcrumbLinkVariants } from "./variants";

export type BreadcrumbLinkProps = Omit<React.ComponentProps<"a">, "className" | "style">;

/** A navigable crumb — renders an anchor styled as a hoverable pill. */
export function BreadcrumbLink(props: BreadcrumbLinkProps) {
  return <a className={breadcrumbLinkVariants()} {...props} />;
}
