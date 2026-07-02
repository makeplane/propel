import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type NumberFieldInputVariantProps, numberFieldInputVariants } from "./variants";

export type { NumberFieldMagnitude } from "./variants";

export type NumberFieldInputProps = Omit<useRender.ComponentProps<"input">, "className" | "style"> &
  NumberFieldInputVariantProps;

/**
 * The styled numeric input. Base-UI-agnostic — graft the number field behavior in `components` via
 * `<BaseNumberField.Input render={<NumberFieldInput/>} />`.
 */
export function NumberFieldInput({ magnitude, render, ...props }: NumberFieldInputProps) {
  const defaultProps: useRender.ElementProps<"input"> = {
    className: numberFieldInputVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "input", render, props: mergeProps(defaultProps, props) });
}
