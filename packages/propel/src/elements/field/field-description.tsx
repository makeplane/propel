import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type FieldDescriptionVariantProps, fieldDescriptionVariants } from "./variants";

export type FieldDescriptionProps = Omit<useRender.ComponentProps<"p">, "className" | "style"> &
  FieldDescriptionVariantProps;

/**
 * Supporting / helper text for a custom field. Base-UI-agnostic — graft the Base UI
 * `Field.Description` behavior in `components` via `<BaseField.Description
 * render={<FieldDescription/>} />`.
 */
export function FieldDescription({ magnitude, render, ...props }: FieldDescriptionProps) {
  const defaultProps: useRender.ElementProps<"p"> = {
    className: fieldDescriptionVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "p", render, props: mergeProps(defaultProps, props) });
}
