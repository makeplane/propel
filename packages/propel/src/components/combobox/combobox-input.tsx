import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import type * as React from "react";

import { comboboxInputVariants } from "./combobox-styles";

export type ComboboxInputProps = Omit<
  React.ComponentProps<typeof BaseCombobox.Input>,
  "className" | "render" | "style"
>;

export function ComboboxInput(props: ComboboxInputProps) {
  return <BaseCombobox.Input className={comboboxInputVariants()} {...props} />;
}
