import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

export type AutocompleteGroupProps = Omit<BaseAutocomplete.Group.Props, "className" | "style">;

/**
 * Groups related suggestions under an `AutocompleteGroupLabel`. Pass the group's `items` so the
 * nested `AutocompleteCollection` renders (and filters) just this group's options.
 */
export function AutocompleteGroup(props: AutocompleteGroupProps) {
  return <BaseAutocomplete.Group {...props} />;
}
