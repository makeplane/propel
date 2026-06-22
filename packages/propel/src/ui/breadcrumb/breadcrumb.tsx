import type * as React from "react";

export type BreadcrumbProps = Omit<React.ComponentProps<"nav">, "className" | "style">;

/** Breadcrumb trail: a `<nav aria-label="Breadcrumb">` wrapping an ordered list. */
export function Breadcrumb({ children, ...props }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" {...props}>
      <ol className="flex items-center gap-0.5">{children}</ol>
    </nav>
  );
}
