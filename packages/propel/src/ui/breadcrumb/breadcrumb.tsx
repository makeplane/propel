import type * as React from "react";

export type BreadcrumbProps = Omit<React.ComponentProps<"nav">, "className" | "style">;

/** Breadcrumb trail landmark: a `<nav aria-label="Breadcrumb">` wrapping a `BreadcrumbList`. */
export function Breadcrumb(props: BreadcrumbProps) {
  return <nav aria-label="Breadcrumb" {...props} />;
}
