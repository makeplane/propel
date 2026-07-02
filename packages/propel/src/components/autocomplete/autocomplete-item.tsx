import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

import { ListboxItem, type ListboxItemMagnitude } from "../../internal/listbox-item";

export type AutocompleteItemProps = Omit<
  BaseAutocomplete.Item.Props,
  "className" | "style" | "render"
> & {
  /** Visual size of the row: height and text size. Required. */
  magnitude: ListboxItemMagnitude;
};

/**
 * The ready-made autocomplete option row: grafts Base UI's `Autocomplete.Item` behavior onto the
 * shared listbox row (`layout="plain"` — autocomplete rows carry no selection marker). Children
 * flow through as the row's content.
 */
export function AutocompleteItem({ magnitude, ...props }: AutocompleteItemProps) {
  return (
    <BaseAutocomplete.Item
      {...props}
      render={<ListboxItem layout="plain" magnitude={magnitude} />}
    />
  );
}
