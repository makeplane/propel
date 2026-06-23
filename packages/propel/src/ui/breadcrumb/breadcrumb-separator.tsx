import { ChevronRight } from "lucide-react";
import type * as React from "react";

import { crumbSeparatorVariants } from "./variants";

export type BreadcrumbSeparatorProps = Omit<React.ComponentProps<"li">, "className" | "style">;

/**
 * The visual divider between crumbs. Pass a custom icon or character as `children`; defaults to a
 * chevron.
 */
export function BreadcrumbSeparator({ children, ...props }: BreadcrumbSeparatorProps) {
  return (
    <li aria-hidden role="presentation" className={crumbSeparatorVariants()} {...props}>
      {children ?? <ChevronRight aria-hidden />}
    </li>
  );
}
