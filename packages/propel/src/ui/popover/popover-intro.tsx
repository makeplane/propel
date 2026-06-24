import type * as React from "react";

import { popoverIntroVariants } from "./variants";

/** Props for {@link PopoverIntro}. */
export type PopoverIntroProps = Omit<React.ComponentPropsWithoutRef<"div">, "className" | "style">;

/**
 * The popup's leading text group — a `PopoverTitle` stacked over a `PopoverDescription`, spaced by
 * a tight gap. Sits as a child of `PopoverBody`.
 */
export function PopoverIntro(props: PopoverIntroProps) {
  return <div className={popoverIntroVariants()} {...props} />;
}
