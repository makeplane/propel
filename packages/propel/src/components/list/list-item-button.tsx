import { CompositeItem, type CompositeItemProps } from "../../base/composite";
import { ListItemButton as ListItemButtonElement } from "../../elements/list/list-item-button";

export type ListItemButtonProps = Omit<
  CompositeItemProps,
  "className" | "style" | "tag" | "render"
>;

/**
 * A list row's primary action — a `<button>` that is also a roving `Composite` item. Base UI's
 * `CompositeItem` roving behavior grafted onto the styled `elements` `ListItemButton` element (rule
 * 1a). Compose a `ListItemIcon` + `ListItemLabel` inside.
 */
export function ListItemButton(props: ListItemButtonProps) {
  return <CompositeItem tag="button" {...props} render={<ListItemButtonElement />} />;
}
