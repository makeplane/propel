import { type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { alertDialogIconVariants } from "./variants";

export type AlertDialogIconTone = NonNullable<VariantProps<typeof alertDialogIconVariants>["tone"]>;

export type AlertDialogIconProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /**
   * Intent of the alert, the destructive-vs-informational axis the spec marks adjustable. Drives
   * the icon's color; required so the caller always states the intent.
   */
  tone: AlertDialogIconTone;
};

/**
 * The decorative leading glyph shown at the inline-start of the title. Sizes its single child to
 * `--node-size`, so the caller passes a bare icon (warning, error, info, …). Decorative — the title
 * carries the accessible name — so it is `aria-hidden`.
 */
export function AlertDialogIcon({ tone, ...props }: AlertDialogIconProps) {
  return <span aria-hidden className={alertDialogIconVariants({ tone })} {...props} />;
}
