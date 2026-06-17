import { Select as BaseSelect } from "@base-ui/react/select";
import type * as React from "react";

import { selectPositionerVariants } from "./select-styles";

export type SelectPositionerProps = Omit<
  React.ComponentProps<typeof BaseSelect.Positioner>,
  "className" | "render" | "style"
>;

export function SelectPositioner(props: SelectPositionerProps) {
  return <BaseSelect.Positioner className={selectPositionerVariants()} {...props} />;
}
