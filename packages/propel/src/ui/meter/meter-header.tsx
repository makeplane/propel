import type * as React from "react";

import { meterHeaderVariants } from "./variants";

export type MeterHeaderProps = Omit<React.ComponentPropsWithoutRef<"div">, "className" | "style">;

/**
 * The row above the track that pairs a `MeterLabel` (inline-start) with a `MeterValue`
 * (inline-end). An anatomy extension beyond Base UI's `Meter` parts: it owns the label/value layout
 * so the components tier composes parts without raw class names.
 */
export function MeterHeader(props: MeterHeaderProps) {
  return <div className={meterHeaderVariants()} {...props} />;
}
