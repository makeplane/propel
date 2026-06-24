import type * as React from "react";

import { pillIconVariants } from "./variants";

export type PillIconProps = Omit<React.ComponentPropsWithoutRef<"span">, "className" | "style">;

/**
 * A decorative leading or trailing node slot (the Figma inline-start / inline-end node). Sizes
 * whatever single child is passed to the pill's inherited `--node-size`, so callers pass a bare
 * icon. Decorative (the pill carries the accessible name), so it is `aria-hidden`.
 */
export function PillIcon(props: PillIconProps) {
  return <span aria-hidden className={pillIconVariants()} {...props} />;
}
