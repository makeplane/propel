import type * as React from "react";

import {
  BreadcrumbPage as BreadcrumbPageSlot,
  type BreadcrumbPageProps as BreadcrumbPageSlotProps,
} from "../../elements/breadcrumb";

export type BreadcrumbPageProps = Omit<BreadcrumbPageSlotProps, "children"> & {
  /**
   * Leading icon before the label, e.g. `<Icon icon={FileText} tint="secondary" />`. Renders 16×16
   * — the crumb sets `--node-size`, so the `<Icon>` needs no `magnitude`.
   */
  icon?: React.ReactNode;
  /** The current-page label. */
  label: string;
};

/**
 * The current page — the last, non-navigable crumb (`aria-current="page"`), laying out an optional
 * leading icon and the label.
 */
export function BreadcrumbPage({ icon, label, ...props }: BreadcrumbPageProps) {
  return (
    <BreadcrumbPageSlot {...props}>
      {icon}
      {label}
    </BreadcrumbPageSlot>
  );
}
