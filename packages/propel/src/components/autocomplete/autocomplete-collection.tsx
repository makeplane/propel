import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

export type AutocompleteCollectionProps = BaseAutocomplete.Collection.Props;

/**
 * Renders the filtered items of the nearest `AutocompleteGroup` (or the root) through a function
 * child — the grouped counterpart of `AutocompleteList`'s function child.
 */
export function AutocompleteCollection(props: AutocompleteCollectionProps) {
  return <BaseAutocomplete.Collection {...props} />;
}
