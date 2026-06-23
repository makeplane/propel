import type * as React from "react";

import { badgeLabelVariants } from "./variants";

export type BadgeLabelProps = Omit<React.ComponentPropsWithoutRef<"span">, "className" | "style">;

/**
 * The badge's text label. Single-line (the pill clips wrapping); sits between an optional leading
 * `BadgeIcon` and a trailing `BadgeDismiss`.
 */
export function BadgeLabel(props: BadgeLabelProps) {
  return <span className={badgeLabelVariants()} {...props} />;
}
