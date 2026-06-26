import { Checkbox, type CheckboxProps } from "../components/checkbox";

export type CheckboxFieldControlProps = Omit<CheckboxProps, "children" | "label" | "inlineStartNode">;

/**
 * The bare checkbox box (Root + check + indeterminate indicators) used inside a field row — the
 * label-less form of the ready-made `Checkbox`. Delegating keeps the check/dash icons a `components`
 * concern; with no `label`, `Checkbox` renders just the box and lets the surrounding `Field` own
 * labeling.
 */
export function CheckboxFieldControl(props: CheckboxFieldControlProps) {
  return <Checkbox {...props} />;
}
