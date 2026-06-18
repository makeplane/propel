import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type * as React from "react";

import { autocompleteInputGroupVariants } from "./variants";

export type AutocompleteInputGroupProps = Omit<
  React.ComponentProps<typeof BaseAutocomplete.InputGroup>,
  "className" | "style"
>;

export function AutocompleteInputGroup(props: AutocompleteInputGroupProps) {
  return <BaseAutocomplete.InputGroup className={autocompleteInputGroupVariants()} {...props} />;
}
