import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

export type ComboboxListProps = Omit<BaseCombobox.List.Props, "className" | "style">;

export function ComboboxList(props: ComboboxListProps) {
  return <BaseCombobox.List {...props} />;
}
