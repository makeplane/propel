import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

/**
 * Base UI's locale-aware filtering hook, re-exported for custom `filter` implementations on the
 * root (e.g. fuzzy or diacritic-insensitive matching).
 */
export const useFilter = BaseCombobox.useFilter;
