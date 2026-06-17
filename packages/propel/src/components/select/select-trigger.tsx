import { Select as BaseSelect } from "@base-ui/react/select";
import type * as React from "react";

import { selectTriggerVariants } from "./select-styles";

export type SelectTriggerProps = Omit<
  React.ComponentProps<typeof BaseSelect.Trigger>,
  "className" | "render" | "style"
>;

export function SelectTrigger(props: SelectTriggerProps) {
  return <BaseSelect.Trigger className={selectTriggerVariants()} {...props} />;
}
