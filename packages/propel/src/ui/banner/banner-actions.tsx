import type * as React from "react";

import { bannerActionsVariants } from "./variants";

export type BannerActionsProps = Omit<React.ComponentPropsWithoutRef<"div">, "className" | "style">;

/** The trailing actions group, placed after the message at the banner's inline-end. */
export function BannerActions(props: BannerActionsProps) {
  return <div className={bannerActionsVariants()} {...props} />;
}
