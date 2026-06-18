import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import type * as React from "react";

import { comboboxLabelVariants } from "./variants";

export type ComboboxLabelProps = Omit<
  React.ComponentProps<typeof BaseCombobox.Label>,
  "className" | "style"
>;

export function ComboboxLabel(props: ComboboxLabelProps) {
  return <BaseCombobox.Label className={comboboxLabelVariants()} {...props} />;
}
