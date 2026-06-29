import type * as React from "react";

import { breadcrumbTriggerIconVariants } from "./variants";

export type BreadcrumbTriggerIconProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** The bare icon to render, sized to the trigger's `--node-size`. */
  children?: React.ReactNode;
};

/**
 * A decorative leading icon at a `BreadcrumbTrigger`'s inline-start. Sizes its single child to the
 * trigger's `--node-size`, so callers pass a bare icon. Decorative (the trigger carries the
 * accessible name), so it is `aria-hidden`.
 */
export function BreadcrumbTriggerIcon(props: BreadcrumbTriggerIconProps) {
  return <span aria-hidden className={breadcrumbTriggerIconVariants()} {...props} />;
}
