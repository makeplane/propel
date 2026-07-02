import { CompositeItem, type CompositeItemProps } from "../../base/composite";
import { ListItemLink as ListItemLinkElement } from "../../elements/list/list-item-link";

export type ListItemLinkProps = Omit<CompositeItemProps, "className" | "style" | "tag" | "render">;

/**
 * A list row's primary navigation target — an `<a>` that is also a roving `Composite` item. Base
 * UI's `CompositeItem` roving behavior grafted onto the styled `elements` `ListItemLink` element
 * (rule 1a). Mark the current page with `aria-current="page"`. Compose a `ListItemIcon` +
 * `ListItemLabel` inside.
 */
export function ListItemLink(props: ListItemLinkProps) {
  return <CompositeItem tag="a" {...props} render={<ListItemLinkElement />} />;
}
