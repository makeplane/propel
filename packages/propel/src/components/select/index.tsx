export * from "./select";
export * from "./select-content";
export * from "./select-item";
export * from "./select-label";
export * from "./select-list";
export * from "./select-trigger";
export * from "./select-group";
export * from "./select-group-label";
// Re-export propel's STYLED select parts that stay styling-only, so a full select can be assembled
// from one entry. The ready-mades above graft Base UI's `Trigger`/`Value`/`Label`/`List`/`Item`
// behavior onto the styled parts, so consumers never compose `@base-ui/react/select` directly. The
// styled `SelectTrigger`/`SelectValue`/`SelectLabel` elements are NOT re-exported here
// — the same-named ready-mades replace them (name collision rule); import them from
// `elements/select` to hand-wire a custom anatomy.
export {
  SelectField,
  type SelectFieldProps,
  SelectItemIndicator,
  type SelectItemIndicatorProps,
  type SelectTriggerMagnitude,
} from "../../elements/select";
