import type * as React from "react";

import { fieldsetBodyVariants } from "./variants";

export type FieldsetBodyProps = Omit<React.ComponentPropsWithRef<"div">, "className" | "style">;

/**
 * The body region of a `Fieldset`: stacks the group's contained fields with the consistent vertical
 * gap the design spec calls for. Sits below the legend (and optional description).
 */
export function FieldsetBody(props: FieldsetBodyProps) {
  return <div className={fieldsetBodyVariants()} {...props} />;
}
