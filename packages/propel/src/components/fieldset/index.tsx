export * from "./fieldset";
// Re-export the atomic parts so a custom fieldset can be built from this convenience import.
export {
  FieldsetBody,
  type FieldsetBodyProps,
  FieldsetDescription,
  type FieldsetDescriptionProps,
  FieldsetLegend,
  type FieldsetLegendProps,
} from "../../ui/fieldset";
