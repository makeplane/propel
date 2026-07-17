import type * as React from "react";

import { FieldItemControlGroup } from "../../elements/field/field-item-control-group";
import type { FieldMagnitude } from "../../elements/field/variants";
import { useFieldOptionMagnitude } from "../../internal/field-option-magnitude";
import { Checkbox, type CheckboxProps } from "../checkbox";
import { FieldItem, FieldItemContent } from "../field";

/** Bare checkbox control props for a field row — no chip `label` / `icon` (Field owns labeling). */
type CheckboxFieldControlProps = Omit<CheckboxProps, "children" | "label" | "icon">;

export type CheckboxGroupFieldOptionProps = Omit<CheckboxFieldControlProps, "aria-label"> & {
  /** Visible option label. */
  label: string;
  /** Optional supporting text announced as the checkbox description. */
  description?: React.ReactNode;
  /** Label and description size. Inherited from `CheckboxGroupField` when omitted. */
  magnitude?: FieldMagnitude;
};

/** A checkbox option row for use inside `CheckboxGroupField` or a custom `CheckboxGroup`. */
export function CheckboxGroupFieldOption({
  label,
  description,
  magnitude: magnitudeProp,
  ...props
}: CheckboxGroupFieldOptionProps) {
  const magnitude = useFieldOptionMagnitude(magnitudeProp);

  return (
    <FieldItem disabled={props.disabled}>
      <FieldItemControlGroup>
        <Checkbox {...props} />
      </FieldItemControlGroup>
      <FieldItemContent magnitude={magnitude} description={description}>
        {label}
      </FieldItemContent>
    </FieldItem>
  );
}
