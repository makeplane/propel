import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import type * as React from "react";

import { comboboxInputGroupVariants } from "./combobox-styles";

export type ComboboxInputGroupProps = Omit<
  React.ComponentProps<typeof BaseCombobox.InputGroup>,
  "className" | "render" | "style"
>;

export function ComboboxInputGroup(props: ComboboxInputGroupProps) {
  return <BaseCombobox.InputGroup className={comboboxInputGroupVariants()} {...props} />;
}
