import type * as React from "react";

import { type AlertDialogIconVariantProps, alertDialogIconVariants } from "./variants";

export type { AlertDialogIconTone, AlertDialogIconVariantProps } from "./variants";

export type AlertDialogIconProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> &
  AlertDialogIconVariantProps;

/**
 * The decorative leading glyph shown at the inline-start of the title. Sizes its single child to
 * `--node-size`, so the caller passes a bare icon (warning, error, info, …). Decorative — the title
 * carries the accessible name — so it is `aria-hidden`.
 */
export function AlertDialogIcon({ tone, ...props }: AlertDialogIconProps) {
  return <span aria-hidden className={alertDialogIconVariants({ tone })} {...props} />;
}
