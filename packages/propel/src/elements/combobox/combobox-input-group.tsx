import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type ComboboxInputGroupVariantProps, comboboxInputGroupVariants } from "./variants";

export type { ComboboxMagnitude } from "./variants";

export type ComboboxInputGroupProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  ComboboxInputGroupVariantProps;

/**
 * The styled bordered frame around the input + its adornments. Base-UI-agnostic — graft in
 * `components` via `<BaseCombobox.InputGroup render={<ComboboxInputGroup/>} />`.
 */
export function ComboboxInputGroup({ magnitude, render, ...props }: ComboboxInputGroupProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: comboboxInputGroupVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
