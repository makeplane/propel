import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

export type AutocompleteListProps = Omit<BaseAutocomplete.List.Props, "className" | "style">;

export function AutocompleteList(props: AutocompleteListProps) {
  return <BaseAutocomplete.List {...props} />;
}
