import { CompositeItem, type CompositeItemProps } from "../../base/composite";
import { type ListItemButtonVariantProps, listItemButtonVariants } from "./variants";

export type ListItemButtonProps = Omit<CompositeItemProps, "className" | "style" | "tag"> &
  ListItemButtonVariantProps;

/**
 * A row's primary action — a `<button>` that is also a roving `Composite` item (like
 * `Toolbar.Button`/`Menu.Item`). For action rows that don't navigate, e.g. a "More" row that
 * expands the sidebar; it shares the row chrome with `ListItemLink`. Compose a `ListItemIcon` +
 * `ListItemLabel` inside.
 */
export function ListItemButton(props: ListItemButtonProps) {
  return (
    <CompositeItem tag="button" type="button" className={listItemButtonVariants()} {...props} />
  );
}
