import type * as React from "react";

import { bannerDescriptionVariants } from "./variants";

export type BannerDescriptionProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "className" | "style"
> & {
  /** The supporting message text, shown below the `BannerTitle`. */
  children?: React.ReactNode;
};

/** The banner's supporting message, stacked below the `BannerTitle` inside the `BannerBody`. */
export function BannerDescription(props: BannerDescriptionProps) {
  return <div className={bannerDescriptionVariants()} {...props} />;
}
