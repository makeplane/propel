export * from "./checkbox";
// Re-export propel's STYLED checkbox parts so a full checkbox can be assembled from one entry. The
// behavior part is Base UI's (`Checkbox.Root` for the box, `Checkbox.Indicator` for the tick/dash) —
// no propel styling — so graft it from `@base-ui/react/checkbox` directly at the call site.
export {
  type CheckboxIndicatorProps,
  CheckboxIndicator,
  CheckboxIndeterminateIndicator,
  type CheckboxIndeterminateIndicatorProps,
  CheckboxLabel,
  type CheckboxLabelProps,
} from "../../elements/checkbox";
