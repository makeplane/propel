import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

export type ComboboxListProps = Omit<BaseCombobox.List.Props, "className" | "style">;

/**
 * The combobox items container — Base UI's `List` behavior part (it carries no propel styling of
 * its own), passed through so a full combobox composes without importing `@base-ui/react`.
 */
export function ComboboxList(props: ComboboxListProps) {
  return <BaseCombobox.List {...props} />;
}
