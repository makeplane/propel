import { Select as BaseSelect } from "@base-ui/react/select";
import type * as React from "react";

import { selectPositionerVariants } from "./variants";

export type SelectPositionerProps = Omit<
  React.ComponentProps<typeof BaseSelect.Positioner>,
  "className" | "style"
>;

export function SelectPositioner(props: SelectPositionerProps) {
  return <BaseSelect.Positioner className={selectPositionerVariants()} {...props} />;
}
