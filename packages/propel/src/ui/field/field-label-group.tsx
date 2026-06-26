import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type FieldLabelGroupVariantProps, fieldLabelGroupVariants } from "./variants";

export type FieldLabelGroupProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  FieldLabelGroupVariantProps;

/**
 * The label/description column of a field: a single styled `<div>` (stacked, gapped). `orientation`
 * matches the field's layout. The ready-made `components/field` `FieldLabelGroup` fills it with a
 * `FieldLabel` and/or `FieldDescription`.
 */
export function FieldLabelGroup({ orientation, render, ...props }: FieldLabelGroupProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: fieldLabelGroupVariants({ orientation }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
