export * from "./form";
// Re-export the pure styling regions (no Base UI behavior) so a full form is composable from this
// convenience entry; they compose inside the ready-made form above.
export {
  FormActions,
  type FormActionsProps,
  FormBody,
  type FormBodyProps,
} from "../../elements/form";
