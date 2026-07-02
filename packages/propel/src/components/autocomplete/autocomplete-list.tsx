import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

export type AutocompleteListProps = Omit<BaseAutocomplete.List.Props, "className" | "style">;

/**
 * The container for autocomplete items — a passthrough of Base UI's `Autocomplete.List` (it carries
 * no propel styling of its own), so the whole anatomy composes from one entry.
 */
export function AutocompleteList(props: AutocompleteListProps) {
  return <BaseAutocomplete.List {...props} />;
}
