export * from "./select";
export * from "./select-content";
// Re-export propel's STYLED select parts so a full select can be assembled from one entry. The list
// surface (`Portal`, `Positioner`, `Popup`) is the shared `internal` overlay/listbox styling, and the
// `List`/`Item`/`ItemText` behavior parts are Base UI's (rows styled by `internal`'s `ListboxItem`) —
// so compose those from `@base-ui/react/select` directly at the call site.
export {
  SelectField,
  type SelectFieldProps,
  SelectIcon,
  type SelectIconProps,
  SelectItemIndicator,
  type SelectItemIndicatorProps,
  SelectLabel,
  type SelectLabelProps,
  SelectScrollDownArrow,
  type SelectScrollDownArrowProps,
  SelectScrollUpArrow,
  type SelectScrollUpArrowProps,
  SelectTrigger,
  type SelectTriggerMagnitude,
  type SelectTriggerProps,
  SelectValue,
  type SelectValueProps,
} from "../../elements/select";
