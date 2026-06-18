import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import type * as React from "react";

import { comboboxEmptyVariants } from "./variants";

export type ComboboxEmptyProps = Omit<
  React.ComponentProps<typeof BaseCombobox.Empty>,
  "className" | "style"
>;

export function ComboboxEmpty(props: ComboboxEmptyProps) {
  return <BaseCombobox.Empty className={comboboxEmptyVariants()} {...props} />;
}
