import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type ComboboxChipsVariantProps, comboboxChipsVariants } from "./variants";

export type ComboboxChipsProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  ComboboxChipsVariantProps;

/**
 * The multiselect input frame holding the `ComboboxChip`s ahead of the inline `ComboboxInput` (it
 * replaces `ComboboxInputGroup` in the `multiple` anatomy). `layout="wrap"` grows onto new rows;
 * `layout="collapse"` keeps a single clipped row for the "+N more" overflow. Base-UI-agnostic —
 * graft in `components` via `<BaseCombobox.Chips render={<ComboboxChips/>} />`.
 */
export function ComboboxChips({ magnitude, layout, render, ...props }: ComboboxChipsProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: comboboxChipsVariants({ magnitude, layout }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
