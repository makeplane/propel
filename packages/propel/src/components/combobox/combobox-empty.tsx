import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import type * as React from "react";

import { comboboxEmptyVariants } from "./combobox-styles";

export type ComboboxEmptyProps = Omit<
  React.ComponentProps<typeof BaseCombobox.Empty>,
  "className" | "render" | "style"
>;

export function ComboboxEmpty(props: ComboboxEmptyProps) {
  return <BaseCombobox.Empty className={comboboxEmptyVariants()} {...props} />;
}
