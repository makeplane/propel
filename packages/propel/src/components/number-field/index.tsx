export * from "./number-field";
export * from "./number-field-scrub-area";
export * from "./number-field-scrub-area-cursor";
// Re-export propel's STYLED number field parts so a full field can be assembled from one entry. The
// behavior parts (`Group`, `Decrement`, `Input`, `Increment`) are Base UI's — graft them from
// `@base-ui/react/number-field` onto these styled parts at the call site.
export {
  NumberFieldGroup,
  type NumberFieldGroupProps,
  NumberFieldInput,
  type NumberFieldInputProps,
  type NumberFieldMagnitude,
} from "../../elements/number-field";
