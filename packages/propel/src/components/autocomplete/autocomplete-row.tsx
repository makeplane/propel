import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

export type AutocompleteRowProps = Omit<BaseAutocomplete.Row.Props, "className" | "style">;

/** A grid row wrapper for multi-column listbox layouts (pass `cols` on the root's `grid`). */
export function AutocompleteRow(props: AutocompleteRowProps) {
  return <BaseAutocomplete.Row {...props} />;
}
