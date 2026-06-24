import type * as React from "react";

import { selectFieldVariants } from "./variants";

export type SelectFieldProps = Omit<React.ComponentPropsWithoutRef<"div">, "className" | "style">;

/**
 * The field region that stacks a `SelectLabel` over a `SelectTrigger` as a column. Layout-only — it
 * owns the gap between the label and the trigger so neither part carries raw spacing.
 */
export function SelectField(props: SelectFieldProps) {
  return <div className={selectFieldVariants()} {...props} />;
}
