import type * as React from "react";

import { popoverBodyVariants } from "./variants";

/** Props for {@link PopoverBody}. */
export type PopoverBodyProps = Omit<React.ComponentPropsWithoutRef<"div">, "className" | "style">;

/**
 * The padded content column inside a `PopoverPopup`. Lays its children out as a vertical stack and
 * supplies the popup's internal padding, so the bare popup carries only the surface chrome. Layout
 * regions (e.g. `PopoverIntro`, `PopoverActions`) sit as its children, separated by its gap.
 */
export function PopoverBody(props: PopoverBodyProps) {
  return <div className={popoverBodyVariants()} {...props} />;
}
