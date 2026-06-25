import type * as React from "react";

import { bannerDismissVariants } from "./variants";

export type BannerDismissProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "className" | "style"
> & {
  /** The dismiss glyph to render (e.g. a Lucide `X`), sized to a 16px node. */
  children?: React.ReactNode;
};

/**
 * The dismiss control at the banner's inline-end. Sizes its single glyph child to a 16px node so
 * callers pass a bare icon. Defaults `type` to `button` and carries an accessible name; both are
 * overridable via spread.
 */
export function BannerDismiss(props: BannerDismissProps) {
  return (
    <button type="button" aria-label="Dismiss" className={bannerDismissVariants()} {...props} />
  );
}
