// Ready-made 1:1 re-export of the ui primitive. Drop down to `@plane/propel/ui/input` only
// when you need the lower-level parts.
export * from "../../ui/input";
// Re-export the field-box surface helper so a consumer (or the components-tier story)
// can frame a bare `Input` without dropping to `ui/field`. `InputMagnitude` already
// comes through from `ui/input` above.
export { type InputTone, inputFieldBoxVariants } from "../../ui/field/variants";
