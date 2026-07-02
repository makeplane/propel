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

/**
 * The autocomplete Root — Base UI's context/state provider (renders no element of its own). A
 * behavior-only role, so it lives in `components` (rules 1a, 2); the styled parts live in
 * `elements/autocomplete` and are grafted onto Base UI behavior here.
 */
export function Autocomplete<Value>(props: AutocompleteProps<Value>) {
  return <BaseAutocomplete.Root {...props} />;
}
