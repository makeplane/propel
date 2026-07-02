// The ready-made `Input` grafts Base UI's `Input` control behavior onto the styled `elements` element.
// Drop down to `@plane/propel/elements/input` for the bare styled parts, or reach for the ready-made
// `InputField` in `@plane/propel/components/input-field`.
export * from "./input";
// The bordered frame and inline icon slot are pure styled elements (no Base UI behavior to graft),
// so re-export them straight from `elements/input`.
export {
  InputGroup,
  type InputGroupProps,
  InputIcon,
  type InputIconProps,
} from "../../elements/input";
