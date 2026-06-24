import type * as React from "react";

import { toggleIconVariants } from "./variants";

export type ToggleIconProps = Omit<React.ComponentPropsWithoutRef<"span">, "className" | "style">;

/**
 * The icon slot inside a `Toggle`. Sizes its single child to the toggle's `--node-size` (set by the
 * toggle's `magnitude`), so callers pass a bare icon with no sizing class. Decorative (the `Toggle`
 * carries the accessible name via `aria-label`), so it is `aria-hidden`.
 */
export function ToggleIcon(props: ToggleIconProps) {
  return <span aria-hidden className={toggleIconVariants()} {...props} />;
}
