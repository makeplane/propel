import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

export type AutocompleteProps<Value> = Omit<
  BaseAutocomplete.Root.Props<Value>,
  "className" | "style"
> & {
  /** Items to display in the autocomplete list. */
  items?: readonly Value[];
};

export function Autocomplete<Value>(props: AutocompleteProps<Value>) {
  return <BaseAutocomplete.Root {...props} />;
}
