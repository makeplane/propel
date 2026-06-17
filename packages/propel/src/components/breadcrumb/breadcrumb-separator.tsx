import { ChevronRight } from "lucide-react";
import type * as React from "react";

export type BreadcrumbSeparatorProps = Omit<React.ComponentProps<"li">, "className" | "style">;

/** The visual divider between crumbs. */
export function BreadcrumbSeparator({ children, ...props }: BreadcrumbSeparatorProps) {
  return (
    <li
      aria-hidden
      role="presentation"
      className="flex items-center px-1 text-icon-tertiary"
      {...props}
    >
      {children ?? <ChevronRight className="size-3.5 rtl:-scale-x-100" />}
    </li>
  );
}
