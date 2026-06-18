import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type * as React from "react";

import { autocompleteItemVariants } from "./variants";

export type AutocompleteItemProps = Omit<
  React.ComponentProps<typeof BaseAutocomplete.Item>,
  "className" | "style"
>;

export function AutocompleteItem(props: AutocompleteItemProps) {
  return <BaseAutocomplete.Item className={autocompleteItemVariants()} {...props} />;
}
