import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type * as React from "react";

import { autocompleteInputGroupVariants } from "./autocomplete-styles";

export type AutocompleteInputGroupProps = Omit<
  React.ComponentProps<typeof BaseAutocomplete.InputGroup>,
  "className" | "render" | "style"
>;

export function AutocompleteInputGroup(props: AutocompleteInputGroupProps) {
  return <BaseAutocomplete.InputGroup className={autocompleteInputGroupVariants()} {...props} />;
}
