import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { fieldLabelVariants, type FieldLabelVariantProps } from "./variants";

export type { FieldMagnitude } from "./variants";

export type FieldLabelProps = Omit<useRender.ComponentProps<"label">, "className" | "style"> &
  FieldLabelVariantProps;

/**
 * The label naming a field's control. Base-UI-agnostic — graft the Base UI `Field.Label`
 * association in `components` via `<BaseField.Label render={<FieldLabel/>} />`.
 */
export function FieldLabel({ magnitude, inset, render, ...props }: FieldLabelProps) {
  const defaultProps: useRender.ElementProps<"label"> = {
    className: fieldLabelVariants({ magnitude, inset }),
  };
  return useRender({ defaultTagName: "label", render, props: mergeProps(defaultProps, props) });
}
