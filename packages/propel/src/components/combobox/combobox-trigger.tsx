import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { ChevronsUpDown } from "lucide-react";
import type * as React from "react";

import { comboboxButtonVariants } from "./combobox-styles";

export type ComboboxTriggerProps = Omit<
  React.ComponentProps<typeof BaseCombobox.Trigger>,
  "className" | "render" | "style"
>;

export function ComboboxTrigger(props: ComboboxTriggerProps) {
  return (
    <BaseCombobox.Trigger className={comboboxButtonVariants()} {...props}>
      {props.children ?? <ChevronsUpDown aria-hidden className="size-4" />}
    </BaseCombobox.Trigger>
  );
}
