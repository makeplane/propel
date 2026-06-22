import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

import { autocompletePositionerVariants } from "./variants";

export type AutocompletePositionerProps = Omit<
  BaseAutocomplete.Positioner.Props,
  "className" | "style"
>;

export function AutocompletePositioner(props: AutocompletePositionerProps) {
  return <BaseAutocomplete.Positioner className={autocompletePositionerVariants()} {...props} />;
}
