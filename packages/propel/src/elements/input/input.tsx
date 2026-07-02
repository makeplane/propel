import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { inputVariants, type InputMagnitude, type InputVariantProps } from "./variants";

export type { InputMagnitude };

export type InputProps = Omit<useRender.ComponentProps<"input">, "className" | "style"> &
  InputVariantProps;

/**
 * The styled single-line text field. Base-UI-agnostic — graft the Base UI `Input` control behavior
 * in `components` via `<BaseInput render={<Input/>} />`.
 */
export function Input({ magnitude, render, ...props }: InputProps) {
  const defaultProps: useRender.ElementProps<"input"> = {
    className: inputVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "input", render, props: mergeProps(defaultProps, props) });
}
