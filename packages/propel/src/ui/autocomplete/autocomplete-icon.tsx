import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

import { autocompleteIconVariants } from "./variants";

export type AutocompleteIconProps = Omit<BaseAutocomplete.Icon.Props, "className" | "style">;

/**
 * The autocomplete's decorative icon — Base UI's `Autocomplete.Icon`, a `<span aria-hidden>` slot.
 * Placed at the input group's inline-start as the leading slot (e.g. a search magnifier); the cva
 * sizes its single child to the group's `--node-size`. Pass a bare icon — it overrides Base UI's
 * default indicator glyph.
 */
export function AutocompleteIcon(props: AutocompleteIconProps) {
  return <BaseAutocomplete.Icon className={autocompleteIconVariants()} {...props} />;
}
