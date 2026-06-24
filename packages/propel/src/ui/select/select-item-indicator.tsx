import { Select as BaseSelect } from "@base-ui/react/select";

import { selectItemIndicatorVariants } from "./variants";

export type SelectItemIndicatorProps = Omit<BaseSelect.ItemIndicator.Props, "className" | "style">;

/**
 * The selection checkmark slot inside an item. Renders whatever svg you pass as `children` (sized
 * to 1rem). Only visible when the item is selected.
 */
export function SelectItemIndicator(props: SelectItemIndicatorProps) {
  return <BaseSelect.ItemIndicator className={selectItemIndicatorVariants()} {...props} />;
}
