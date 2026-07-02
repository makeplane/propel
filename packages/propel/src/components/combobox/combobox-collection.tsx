import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

export type ComboboxCollectionProps = BaseCombobox.Collection.Props;

/**
 * Renders the filtered items of the nearest `ComboboxGroup` (or the root) through a function child
 * — the grouped counterpart of `ComboboxList`'s function child.
 */
export function ComboboxCollection(props: ComboboxCollectionProps) {
  return <BaseCombobox.Collection {...props} />;
}
