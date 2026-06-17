import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type * as React from "react";

import { autocompletePositionerVariants } from "./autocomplete-styles";

export type AutocompletePositionerProps = Omit<
  React.ComponentProps<typeof BaseAutocomplete.Positioner>,
  "className" | "render" | "style"
>;

export function AutocompletePositioner(props: AutocompletePositionerProps) {
  return <BaseAutocomplete.Positioner className={autocompletePositionerVariants()} {...props} />;
}
