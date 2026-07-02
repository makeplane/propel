import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { comboboxInputVariants } from "./variants";

export type ComboboxInputProps = Omit<useRender.ComponentProps<"input">, "className" | "style">;

/**
 * The styled combobox text field. Base-UI-agnostic — graft the combobox behavior in `components`
 * via `<BaseCombobox.Input render={<ComboboxInput/>} />`.
 */
export function ComboboxInput({ render, ...props }: ComboboxInputProps) {
  const defaultProps: useRender.ElementProps<"input"> = { className: comboboxInputVariants() };
  return useRender({ defaultTagName: "input", render, props: mergeProps(defaultProps, props) });
}
