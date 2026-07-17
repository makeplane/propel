import type * as React from "react";

import {
  BreadcrumbLink as BreadcrumbLinkSlot,
  type BreadcrumbLinkProps as BreadcrumbLinkSlotProps,
} from "../../elements/breadcrumb";

export type BreadcrumbLinkProps = Omit<BreadcrumbLinkSlotProps, "children"> & {
  /**
   * Leading icon before the label, e.g. `<Icon icon={Layers} tint="secondary" />`. Renders 16×16 —
   * the crumb sets `--node-size`, so the `<Icon>` needs no `magnitude`.
   */
  icon?: React.ReactNode;
  /** The crumb label. */
  label: string;
};

/**
 * A navigable crumb — an anchor styled as a hoverable pill, laying out an optional leading icon and
 * the label. Pass `render` to use a router link.
 */
export function BreadcrumbLink({ icon, label, ...props }: BreadcrumbLinkProps) {
  return (
    <BreadcrumbLinkSlot {...props}>
      {icon}
      {label}
    </BreadcrumbLinkSlot>
  );
}
