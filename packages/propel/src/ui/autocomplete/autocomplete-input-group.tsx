import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

import {
  type AutocompleteInputGroupVariantProps,
  autocompleteInputGroupVariants,
} from "./variants";

export type { AutocompleteMagnitude } from "./variants";

export type AutocompleteInputGroupProps = Omit<
  BaseAutocomplete.InputGroup.Props,
  "className" | "style"
> &
  AutocompleteInputGroupVariantProps;

export function AutocompleteInputGroup({ magnitude, ...props }: AutocompleteInputGroupProps) {
  return (
    <BaseAutocomplete.InputGroup
      className={autocompleteInputGroupVariants({ magnitude })}
      {...props}
    />
  );
}
