import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { numberFieldVariants } from "./variants";

export type NumberFieldProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled number field frame — stacks the label, group, and messages. Base-UI-agnostic — graft
 * the number field behavior in `components` via `<BaseNumberField.Root render={<NumberField/>}
 * />`.
 */
export function NumberField({ render, ...props }: NumberFieldProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: numberFieldVariants(),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
