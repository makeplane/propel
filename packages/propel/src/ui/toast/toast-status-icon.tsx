import type * as React from "react";

import { type ToastStatusIconVariantProps, toastStatusIconVariants } from "./variants";

export type { ToastTone } from "./variants";

export type ToastStatusIconProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> &
  ToastStatusIconVariantProps;

/**
 * The tone-colored status-icon slot at a toast's inline-start. A single styled `<span>` that sizes
 * and colors its bare `<svg>` glyph child (passed as `children`); the tone→glyph mapping is a
 * `components` concern (see `components/toast`).
 */
export function ToastStatusIcon({ tone, ...props }: ToastStatusIconProps) {
  return <span aria-hidden className={toastStatusIconVariants({ tone })} {...props} />;
}
