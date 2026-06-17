import type * as React from "react";

export type BreadcrumbItemProps = Omit<React.ComponentProps<"li">, "className" | "style">;

/** One step in the trail: a list item holding a link, page, or dropdown crumb. */
export function BreadcrumbItem(props: BreadcrumbItemProps) {
  return <li className="inline-flex items-center" {...props} />;
}
