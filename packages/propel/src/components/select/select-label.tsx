import { Select as BaseSelect } from "@base-ui/react/select";
import type * as React from "react";

import { selectLabelVariants } from "./select-styles";

export type SelectLabelProps = Omit<
  React.ComponentProps<typeof BaseSelect.Label>,
  "className" | "render" | "style"
>;

export function SelectLabel(props: SelectLabelProps) {
  return <BaseSelect.Label className={selectLabelVariants()} {...props} />;
}
