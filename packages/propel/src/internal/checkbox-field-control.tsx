import {
  Checkbox,
  CheckboxGlyph,
  CheckboxIndicator,
  type CheckboxProps,
} from "../ui/checkbox/index";

export type CheckboxFieldControlProps = Omit<CheckboxProps, "children">;

/** The bare checkbox box (Root + indicator + glyph) used inside a field row. */
export function CheckboxFieldControl(props: CheckboxFieldControlProps) {
  return (
    <Checkbox {...props}>
      <CheckboxIndicator>
        <CheckboxGlyph indeterminate={props.indeterminate} />
      </CheckboxIndicator>
    </Checkbox>
  );
}
