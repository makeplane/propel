import type * as React from "react";

import { badgeIconVariants } from "./variants";

export type BadgeIconProps = Omit<React.ComponentPropsWithoutRef<"span">, "className" | "style">;

/**
 * The decorative leading icon at the badge's inline-start (the Figma badge icon). Sizes its single
 * child to the badge's `--node-size` and inherits the tone's text color, so callers pass a bare
 * icon. Decorative (the label carries the name), so it is `aria-hidden`.
 */
export function BadgeIcon(props: BadgeIconProps) {
  return <span aria-hidden className={badgeIconVariants()} {...props} />;
}
