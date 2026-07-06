// The ready-made `Input` grafts Base UI's `Input` control behavior onto the styled `elements` element.
// Drop down to `@makeplane/propel/elements/input` for the bare styled parts, or reach for the ready-made
// `InputField` in `@makeplane/propel/components/input-field`.
export * from "./input";
// The bordered frame and inline icon slot are pure styled elements (no Base UI behavior to graft),
// so re-export them straight from `elements/input`.
export { InputGroup, type InputGroupProps } from "../../elements/input";
