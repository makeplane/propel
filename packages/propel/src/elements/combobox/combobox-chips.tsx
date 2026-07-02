import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type ComboboxChipsVariantProps, comboboxChipsVariants } from "./variants";

export type ComboboxChipsProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  ComboboxChipsVariantProps;

/**
 * The multiselect input frame: a wrapping row of `ComboboxChip`s ahead of the inline
 * `ComboboxInput` (it replaces `ComboboxInputGroup` in the `multiple` anatomy). Base-UI-agnostic —
 * graft in `components` via `<BaseCombobox.Chips render={<ComboboxChips/>} />`.
 */
export function ComboboxChips({ magnitude, render, ...props }: ComboboxChipsProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: comboboxChipsVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
