export * from "./autocomplete-content";
// Re-export the atomic autocomplete parts so a full autocomplete can be assembled from one entry.
// `AutocompleteClear`/`AutocompleteTrigger` are behavior-only ui parts now — composed under an
// `IconButton` via `render` at the call site (see `autocomplete-field`).
export {
  Autocomplete,
  type AutocompleteProps,
  AutocompleteClear,
  type AutocompleteClearProps,
  AutocompleteEmpty,
  type AutocompleteEmptyProps,
  AutocompleteInput,
  type AutocompleteInputProps,
  AutocompleteInputGroup,
  type AutocompleteInputGroupProps,
  AutocompleteInputIcon,
  type AutocompleteInputIconProps,
  AutocompleteItem,
  type AutocompleteItemProps,
  AutocompleteList,
  AutocompleteTrigger,
  type AutocompleteTriggerProps,
} from "../../ui/autocomplete";
