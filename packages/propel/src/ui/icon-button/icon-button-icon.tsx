import type * as React from "react";

import { iconButtonIconVariants } from "./variants";

export type IconButtonIconProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** The bare icon to render, sized to the root's `--node-size`. */
  children?: React.ReactNode;
};

/**
 * The icon-button's single glyph. Sizes its one child to the root's inherited `--node-size`, so
 * callers pass a bare icon. Decorative (the root's `aria-label` carries the accessible name), so it
 * is `aria-hidden`.
 */
export function IconButtonIcon(props: IconButtonIconProps) {
  return <span aria-hidden className={iconButtonIconVariants()} {...props} />;
}
