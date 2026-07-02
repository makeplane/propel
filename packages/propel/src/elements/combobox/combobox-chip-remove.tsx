import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { comboboxChipRemoveVariants } from "./variants";

export type ComboboxChipRemoveProps = Omit<
  useRender.ComponentProps<"button">,
  "className" | "style"
>;

/**
 * The remove affordance inside a `ComboboxChip`. Renders whatever X-style svg you pass, sized to
 * the chip's scale. Give it an `aria-label` naming the value it removes. Base-UI-agnostic — graft
 * in `components` via `<BaseCombobox.ChipRemove render={<ComboboxChipRemove/>} />`.
 */
export function ComboboxChipRemove({ render, ...props }: ComboboxChipRemoveProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    type: "button",
    className: comboboxChipRemoveVariants(),
  };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
