import type * as React from "react";

import { bannerTitleVariants } from "./variants";

export type BannerTitleProps = Omit<React.ComponentPropsWithoutRef<"div">, "className" | "style">;

/** The banner's headline, stacked above the `BannerDescription` inside the `BannerBody`. */
export function BannerTitle(props: BannerTitleProps) {
  return <div className={bannerTitleVariants()} {...props} />;
}
