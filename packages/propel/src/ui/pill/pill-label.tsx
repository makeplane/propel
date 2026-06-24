import type * as React from "react";

import { pillLabelVariants } from "./variants";

export type PillLabelProps = Omit<React.ComponentPropsWithoutRef<"span">, "className" | "style">;

/** The pill's single-line label. Shrinks and truncates instead of wrapping. */
export function PillLabel(props: PillLabelProps) {
  return <span className={pillLabelVariants()} {...props} />;
}
