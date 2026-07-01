import { CompositeItem, type CompositeItemProps } from "../../base/composite";
import { type ListItemLinkVariantProps, listItemLinkVariants } from "./variants";

export type ListItemLinkProps = Omit<CompositeItemProps, "className" | "style" | "tag"> &
  ListItemLinkVariantProps;

/**
 * A row's primary navigation target — an `<a>` that is also a roving `Composite` item (like
 * `Toolbar.Link`/`Menu.LinkItem`). Mark the current page with `aria-current="page"` (the wrapping
 * `ListItem` reads it for the selected look). Render-capable: pass `render` to swap in a router
 * `<Link>`. Compose a `ListItemIcon` + `ListItemLabel` inside.
 */
export function ListItemLink(props: ListItemLinkProps) {
  return <CompositeItem tag="a" className={listItemLinkVariants()} {...props} />;
}
