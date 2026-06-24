import type * as React from "react";

import { buttonIconVariants } from "./variants";

export type ButtonIconProps = Omit<React.ComponentPropsWithoutRef<"span">, "className" | "style">;

/**
 * A decorative node beside the label (Figma leading/trailing icon). Sizes its single child to the
 * button's `--node-size`, so callers pass a bare icon/avatar. Decorative — the button's label
 * carries the accessible name — so it is `aria-hidden`.
 */
export function ButtonIcon(props: ButtonIconProps) {
  return <span aria-hidden className={buttonIconVariants()} {...props} />;
}
