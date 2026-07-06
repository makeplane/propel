import { Select as BaseSelect } from "@base-ui/react/select";
import { Check } from "lucide-react";
import type * as React from "react";

import { SelectItemIndicator } from "../../elements/select";
import { ListboxItem, type ListboxItemMagnitude } from "../../internal/listbox-item";

export type SelectItemProps = Omit<
  BaseSelect.Item.Props,
  "children" | "className" | "label" | "render" | "style"
> & {
  /** Visual size of the row: controls its height and text size. Required. */
  magnitude: ListboxItemMagnitude;
  /** Option label. */
  label: React.ReactNode;
};

/**
 * The ready-made select option row: grafts Base UI's `Select.Item` behavior onto the shared listbox
 * row and bakes the selection marker — Base UI's `Select.ItemIndicator` grafted onto the styled
 * `SelectItemIndicator` with a check glyph. The marker is `keepMounted` because the
 * `layout="indicator"` row places children positionally: it must occupy the leading column even
 * while unselected (the styled marker hides its glyph off `data-selected`). The `label` prop
 * becomes the item's text via Base UI's `Select.ItemText`.
 */
export function SelectItem({ label, magnitude, ...props }: SelectItemProps) {
  return (
    <BaseSelect.Item {...props} render={<ListboxItem layout="indicator" magnitude={magnitude} />}>
      <BaseSelect.ItemIndicator keepMounted render={<SelectItemIndicator />}>
        <Check aria-hidden />
      </BaseSelect.ItemIndicator>
      <BaseSelect.ItemText>{label}</BaseSelect.ItemText>
    </BaseSelect.Item>
  );
}
