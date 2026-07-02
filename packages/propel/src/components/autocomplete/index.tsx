export * from "./autocomplete";
export * from "./autocomplete-content";
// Re-export propel's STYLED autocomplete parts so a full autocomplete can be assembled from one
// entry. The behavior/structural parts (`Clear`, `Trigger`, `Portal`, `List`) are Base UI's — no
// propel styling — so compose them from `@base-ui/react/autocomplete` directly at the call site.
export {
  AutocompleteEmpty,
  type AutocompleteEmptyProps,
  AutocompleteInput,
  type AutocompleteInputProps,
  AutocompleteInputGroup,
  type AutocompleteInputGroupProps,
  AutocompleteIcon,
  type AutocompleteIconProps,
} from "../../elements/autocomplete";
