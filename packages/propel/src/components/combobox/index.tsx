export * from "./combobox";
export * from "./combobox-content";
// Ready-made part that supplies a default icon — replaces the bare `elements` slot for consumers.
export * from "./combobox-item-indicator";
// Re-export propel's STYLED combobox parts so a full combobox can be assembled from one entry. The
// behavior/structural parts (`Clear`, `Trigger`, `Portal`, `List`, `Positioner`) are Base UI's — no
// propel styling — so compose them from `@base-ui/react/combobox` directly at the call site.
export {
  ComboboxEmpty,
  type ComboboxEmptyProps,
  ComboboxInput,
  type ComboboxInputProps,
  ComboboxInputGroup,
  type ComboboxInputGroupProps,
  ComboboxLabel,
  type ComboboxLabelProps,
} from "../../elements/combobox";
