import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type InputFieldVariantProps, inputFieldVariants } from "./variants";

export type InputFieldProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  InputFieldVariantProps;

/**
 * The orientation-aware layout frame for an input field (label above or beside the control).
 * Base-UI-agnostic — graft `Field.Root` in `components` via `<BaseField.Root render={<InputField/>}
 * />`.
 */
export function InputField({ orientation, render, ...props }: InputFieldProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: inputFieldVariants({ orientation }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
