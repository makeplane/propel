import { type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { bannerIconVariants } from "./variants";

export type BannerIconProps = Omit<React.ComponentPropsWithoutRef<"span">, "className" | "style"> &
  VariantProps<typeof bannerIconVariants>;

/**
 * The leading icon slot at the banner's inline-start (the Figma intent icon). Sizes its single
 * child to the banner's node size and tints it per `tone`, so callers pass a bare icon. Decorative
 * (the message carries the meaning), so it is `aria-hidden`.
 */
export function BannerIcon({ variant, tone, ...props }: BannerIconProps) {
  return <span aria-hidden className={bannerIconVariants({ variant, tone })} {...props} />;
}
