import type * as React from "react";

import { bannerDismissVariants } from "./variants";

export type BannerDismissProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "className" | "style" | "aria-label"
> & {
  /** The dismiss glyph to render (e.g. a Lucide `X`), sized to a 16px node. */
  children?: React.ReactNode;
  /** Accessible name for the dismiss button — consumer-provided so it can be localized. */
  "aria-label": string;
};

/**
 * The dismiss control at the banner's inline-end. Sizes its single glyph child to a 16px node so
 * callers pass a bare icon. Defaults `type` to `button` (overridable via spread). Requires an
 * `aria-label` — the consumer supplies its accessible name so it can be localized.
 */
export function BannerDismiss(props: BannerDismissProps) {
  return <button type="button" className={bannerDismissVariants()} {...props} />;
}
