import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

/**
 * Base UI's locale-aware filtering hook, re-exported for custom `filter` implementations on the
 * root (e.g. fuzzy or diacritic-insensitive matching).
 */
export const useFilter = BaseCombobox.useFilter;

/**
 * Base UI's hook pairing `useFilter` with the root's `items`, returning the filtered collection —
 * for rendering fully custom list structures.
 */
export const useFilteredItems = BaseCombobox.useFilteredItems;
