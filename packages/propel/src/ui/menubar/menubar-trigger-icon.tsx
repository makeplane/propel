import type * as React from "react";

import { menubarTriggerIconVariants } from "./variants";

export type MenubarTriggerIconProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** The bare icon to render, sized to the trigger's `--node-size`. */
  children?: React.ReactNode;
};

/**
 * A decorative leading icon at a menu bar trigger's inline-start. Sizes its single child to the
 * trigger's `--node-size`, so callers pass a bare icon. Decorative (the trigger carries the
 * accessible name), so it is `aria-hidden`. Compose it only when the item has an icon — the
 * designer's "whether items have icons" axis.
 */
export function MenubarTriggerIcon(props: MenubarTriggerIconProps) {
  return <span aria-hidden className={menubarTriggerIconVariants()} {...props} />;
}
