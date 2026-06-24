import type * as React from "react";

import { breadcrumbSeparatorVariants } from "./variants";

export type BreadcrumbSeparatorProps = Omit<React.ComponentProps<"li">, "className" | "style">;

/**
 * The visual divider between crumbs. A node-slot: it sizes its single child (icon or character), so
 * callers pass the divider glyph as `children`. Decorative, so it is removed from the a11y tree.
 */
export function BreadcrumbSeparator(props: BreadcrumbSeparatorProps) {
  return (
    <li aria-hidden role="presentation" className={breadcrumbSeparatorVariants()} {...props} />
  );
}
