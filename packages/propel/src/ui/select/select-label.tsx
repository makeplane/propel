import { Select as BaseSelect } from "@base-ui/react/select";
import type * as React from "react";

import { selectLabelVariants } from "./variants";

export type SelectLabelProps = Omit<
  React.ComponentProps<typeof BaseSelect.Label>,
  "className" | "style"
>;

export function SelectLabel(props: SelectLabelProps) {
  return <BaseSelect.Label className={selectLabelVariants()} {...props} />;
}
