import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

import { ListboxItem, type ListboxItemMagnitude } from "../../internal/listbox-item";
// Ready-made marker that supplies the default check glyph (defaults are a `components` concern).
import { ComboboxItemIndicator } from "./combobox-item-indicator";

export type ComboboxItemProps = Omit<BaseCombobox.Item.Props, "className" | "style"> & {
  /** Row height and text size. Required. */
  magnitude: ListboxItemMagnitude;
};

/**
 * The ready-made option row: Base UI's `Item` behavior grafted onto the shared listbox row. The
 * row's `indicator` layout reserves a leading 1rem column, which the baked-in
 * `ComboboxItemIndicator` selection marker occupies (kept mounted while unselected so the label —
 * wrapped in a `<span>` for the positional grid — stays in its own column).
 */
export function ComboboxItem({ magnitude, children, ...props }: ComboboxItemProps) {
  return (
    <BaseCombobox.Item {...props} render={<ListboxItem layout="indicator" magnitude={magnitude} />}>
      <ComboboxItemIndicator />
      <span>{children}</span>
    </BaseCombobox.Item>
  );
}
