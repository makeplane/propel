import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { comboboxChipsVariants } from "./variants";

export type ComboboxChipsProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The multiselect input frame: a wrapping row of `ComboboxChip`s ahead of the inline
 * `ComboboxInput` (it replaces `ComboboxInputGroup` in the `multiple` anatomy). Base-UI-agnostic —
 * graft in `components` via `<BaseCombobox.Chips render={<ComboboxChips/>} />`.
 */
export function ComboboxChips({ render, ...props }: ComboboxChipsProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: comboboxChipsVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
