import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type FieldErrorVariantProps, fieldErrorVariants } from "./variants";

export type FieldErrorProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  FieldErrorVariantProps;

/**
 * Error text for a custom field. Base-UI-agnostic — graft the Base UI `Field.Error` validation
 * behavior in `components` via `<BaseField.Error render={<FieldError/>} />`.
 */
export function FieldError({ magnitude, render, ...props }: FieldErrorProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: fieldErrorVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
