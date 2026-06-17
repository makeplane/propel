import { cx } from "class-variance-authority";
import type * as React from "react";

import { crumbVariants } from "./breadcrumb-styles";

export type BreadcrumbLinkProps = Omit<React.ComponentProps<"a">, "className" | "style">;

/** A navigable crumb — renders an anchor styled as a hoverable pill. */
export function BreadcrumbLink(props: BreadcrumbLinkProps) {
  return <a className={cx(crumbVariants({ interactive: true }))} {...props} />;
}
