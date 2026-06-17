import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import type * as React from "react";

import { comboboxPositionerVariants } from "./combobox-styles";

export type ComboboxPositionerProps = Omit<
  React.ComponentProps<typeof BaseCombobox.Positioner>,
  "className" | "render" | "style"
>;

export function ComboboxPositioner(props: ComboboxPositionerProps) {
  return <BaseCombobox.Positioner className={comboboxPositionerVariants()} {...props} />;
}
