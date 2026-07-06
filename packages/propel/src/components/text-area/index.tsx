// The ready-made `TextArea` grafts Base UI's `Field.Control` behavior onto the styled `elements` element.
// Drop down to `@makeplane/propel/elements/text-area` for the bare styled parts, or reach for the ready-made
// `TextAreaField` in `@makeplane/propel/components/text-area-field`.
export * from "./text-area";
// The bordered frame is a pure styled element (no Base UI behavior to graft), so re-export it
// straight from `elements/text-area`.
export { TextAreaGroup, type TextAreaGroupProps } from "../../elements/text-area";
