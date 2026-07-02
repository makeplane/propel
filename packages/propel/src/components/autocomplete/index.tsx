export * from "./autocomplete";
export * from "./autocomplete-content";
export * from "./autocomplete-empty";
export * from "./autocomplete-input-group";
export * from "./autocomplete-item";
export * from "./autocomplete-list";
// Re-export the STYLED `elements` parts the ready-mades above do NOT replace, so a custom input
// row can still be assembled from one entry. Cross-tier re-exports stay explicit — never
// `export *` — because the ready-made `AutocompleteInputGroup` and `AutocompleteEmpty` replace
// their same-named `elements` parts (name collision). `Clear`/`Trigger` are the `clear`/`trigger`
// node props on `AutocompleteInputGroup`; `Portal`/`Positioner`/`Popup` are `AutocompleteContent`;
// `List`/`Item` are `AutocompleteList`/`AutocompleteItem` — no Base UI import needed at call sites.
export {
  AutocompleteIcon,
  type AutocompleteIconProps,
  AutocompleteInput,
  type AutocompleteInputProps,
  type AutocompleteMagnitude,
} from "../../elements/autocomplete";
