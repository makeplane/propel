import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { Check } from "lucide-react";
import type * as React from "react";

export type ComboboxItemIndicatorProps = Omit<
  React.ComponentProps<typeof BaseCombobox.ItemIndicator>,
  "className" | "render" | "style"
>;

export function ComboboxItemIndicator(props: ComboboxItemIndicatorProps) {
  return (
    <BaseCombobox.ItemIndicator className="flex size-4 items-center justify-center" {...props}>
      {props.children ?? <Check aria-hidden className="size-4" />}
    </BaseCombobox.ItemIndicator>
  );
}
