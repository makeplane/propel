import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type * as React from "react";

export type AutocompleteProps<Value> = Omit<
  BaseAutocomplete.Root.Props<Value>,
  "className" | "style"
> & {
  /** Items to display in the autocomplete list. */
  items?: readonly Value[];
  /** The autocomplete's anatomy — an `AutocompleteInput` and the `AutocompletePopup` of items. */
  children?: React.ReactNode;
};

export function Autocomplete<Value>(props: AutocompleteProps<Value>) {
  return <BaseAutocomplete.Root {...props} />;
}
