export * from "./combobox-content";
// Ready-made parts that supply a default icon — these replace the bare `ui` slots for consumers.
export * from "./combobox-item-indicator";
// Re-export the atomic combobox parts so a full combobox can be assembled from one entry.
// `ComboboxClear`/`ComboboxTrigger` are behavior-only ui parts now — composed under an
// `IconButton` via `render` at the call site (see `combobox-field`).
export {
  Combobox,
  type ComboboxProps,
  ComboboxClear,
  type ComboboxClearProps,
  ComboboxEmpty,
  type ComboboxEmptyProps,
  ComboboxInput,
  type ComboboxInputProps,
  ComboboxInputGroup,
  type ComboboxInputGroupProps,
  ComboboxItem,
  type ComboboxItemProps,
  ComboboxLabel,
  type ComboboxLabelProps,
  ComboboxList,
  ComboboxTrigger,
  type ComboboxTriggerProps,
} from "../../ui/combobox";
