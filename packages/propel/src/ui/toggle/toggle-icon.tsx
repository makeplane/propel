import type * as React from "react";

import { toggleIconVariants } from "./variants";

export type ToggleIconProps = Omit<React.ComponentPropsWithoutRef<"span">, "className" | "style">;

/**
 * The toggle's glyph slot. Sizes its single child to the toggle's `--node-size`, so callers pass a
 * bare icon (no per-call sizing). Decorative — the toggle carries the accessible name via
 * `aria-label` — so it is `aria-hidden`.
 */
export function ToggleIcon(props: ToggleIconProps) {
  return <span aria-hidden className={toggleIconVariants()} {...props} />;
}
