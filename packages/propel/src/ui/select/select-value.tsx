import { Select as BaseSelect } from "@base-ui/react/select";
import type * as React from "react";

export type SelectValueProps = Omit<
  React.ComponentProps<typeof BaseSelect.Value>,
  "className" | "style"
>;

export function SelectValue(props: SelectValueProps) {
  return <BaseSelect.Value {...props} />;
}
