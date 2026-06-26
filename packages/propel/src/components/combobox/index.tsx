export * from "./combobox-content";
// Ready-made parts that supply a default icon — these replace the bare `ui` slots for consumers.
export * from "./combobox-clear";
export * from "./combobox-item-indicator";
export * from "./combobox-trigger";
// Re-export the atomic combobox parts so a full combobox can be assembled from one entry.
export {
  Combobox,
  type ComboboxProps,
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
} from "../../ui/combobox";
