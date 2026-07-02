import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

/**
 * Base UI's locale-aware filtering hook, re-exported for custom `filter` implementations on the
 * root (e.g. fuzzy or diacritic-insensitive matching).
 */
export const useFilter = BaseAutocomplete.useFilter;

/**
 * Base UI's hook pairing `useFilter` with the root's `items`, returning the filtered collection —
 * for rendering fully custom list structures.
 */
export const useFilteredItems = BaseAutocomplete.useFilteredItems;
