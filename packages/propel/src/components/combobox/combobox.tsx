import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

export type ComboboxProps<Value, Multiple extends boolean | undefined = false> = Omit<
  BaseCombobox.Root.Props<Value, Multiple>,
  "className" | "render" | "style"
>;

export function Combobox<Value, Multiple extends boolean | undefined = false>(
  props: ComboboxProps<Value, Multiple>,
) {
  return <BaseCombobox.Root {...props} />;
}
