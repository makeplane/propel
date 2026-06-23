import type * as React from "react";

import { searchIconVariants } from "./variants";

export type SearchIconProps = Omit<React.ComponentPropsWithoutRef<"span">, "className" | "style">;

/**
 * The decorative leading magnifier at the box's inline-start. Sizes its single child to the box's
 * `--node-size`, so callers pass a bare icon. Decorative (the input carries the accessible name),
 * so it is `aria-hidden`.
 */
export function SearchIcon(props: SearchIconProps) {
  return <span aria-hidden className={searchIconVariants()} {...props} />;
}
