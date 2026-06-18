import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import type * as React from "react";

import { comboboxInputVariants } from "./variants";

export type ComboboxInputProps = Omit<
  React.ComponentProps<typeof BaseCombobox.Input>,
  "className" | "style"
>;

export function ComboboxInput(props: ComboboxInputProps) {
  return <BaseCombobox.Input className={comboboxInputVariants()} {...props} />;
}
