import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

export type ComboboxGroupProps = Omit<BaseCombobox.Group.Props, "className" | "style">;

/**
 * Groups related options under a `ComboboxGroupLabel`. Pass the group's `items` so the nested
 * `ComboboxCollection` renders (and filters) just this group's options.
 */
export function ComboboxGroup(props: ComboboxGroupProps) {
  return <BaseCombobox.Group {...props} />;
}
