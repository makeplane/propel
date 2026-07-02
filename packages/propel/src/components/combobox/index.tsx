export * from "./combobox";
export * from "./combobox-chips";
export * from "./combobox-collection";
export * from "./combobox-content";
export * from "./combobox-empty";
export * from "./combobox-group";
export * from "./combobox-group-label";
export * from "./combobox-input-group";
export * from "./combobox-item";
// Ready-made part that supplies a default icon — replaces the bare `elements` slot for consumers.
export * from "./combobox-item-indicator";
export * from "./combobox-list";
// The ready-mades above bundle every Base UI behavior part (`Clear`/`Trigger` as node props on
// `ComboboxInputGroup`; `Portal`/`Positioner`/`Popup` inside `ComboboxContent`;
// `Value`/`Chip`/`ChipRemove` inside `ComboboxChips`; `List` as a passthrough), so a full combobox
// composes from this entry without importing `@base-ui/react`. `ComboboxLabel` stays a styled
// `elements` part — graft it onto `BaseCombobox.Label` at the call site for the advanced anatomy.
export { ComboboxLabel, type ComboboxLabelProps } from "../../elements/combobox";
