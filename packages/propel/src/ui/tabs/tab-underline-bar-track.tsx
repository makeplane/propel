import type * as React from "react";

import { underlineBarTrackVariants } from "./variants";

export type TabUnderlineBarTrackProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The padded track that holds an `underline`-appearance tab's sliding bar. Renders its bar child
 * via `{...props}` so the underline track cva stays internal; compose `<TabUnderlineBar />` inside
 * it.
 */
export function TabUnderlineBarTrack(props: TabUnderlineBarTrackProps) {
  return <span className={underlineBarTrackVariants()} {...props} />;
}
