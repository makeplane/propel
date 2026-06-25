import type * as React from "react";

import { menuSearchIconVariants } from "./variants";

export type MenuSearchIconProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** The search icon to render (e.g. a Lucide `Search`), sized to the slot. */
  children?: React.ReactNode;
};

/**
 * The leading icon slot inside `MenuSearch`. Sizes its single child; decorative, so it is
 * `aria-hidden`. Renders and sizes its single child; pass the glyph as `children`.
 */
export function MenuSearchIcon(props: MenuSearchIconProps) {
  return <span aria-hidden className={menuSearchIconVariants()} {...props} />;
}
