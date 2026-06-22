// Ready-made 1:1 re-export of the ui primitive. Drop down to `@plane/propel/ui/text-area` only
// when you need the lower-level parts.
export * from "../../ui/text-area";
// Re-export the field-box surface helper so a consumer (or the components-tier story)
// can frame a bare `TextArea` without dropping to `ui/field`.
export { textAreaFieldBoxVariants } from "../../ui/field/variants";
