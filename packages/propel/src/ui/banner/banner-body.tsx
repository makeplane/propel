import { type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { bannerBodyVariants } from "./variants";

export type BannerBodyProps = Omit<React.ComponentPropsWithoutRef<"div">, "className" | "style"> &
  VariantProps<typeof bannerBodyVariants>;

/**
 * The message column between the icon and the trailing controls. Grows to fill the row and stacks a
 * `BannerTitle` above a `BannerDescription`. Carries the tone foreground color (inherited by both)
 * and the per-variant text weight.
 */
export function BannerBody({ variant, tone, ...props }: BannerBodyProps) {
  return <div className={bannerBodyVariants({ variant, tone })} {...props} />;
}
