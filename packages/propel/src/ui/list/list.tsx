import { Composite, type CompositeProps } from "../../base/composite";
import { type ListVariantProps, listVariants } from "./variants";

export type ListProps = Omit<CompositeProps, "className" | "style"> & ListVariantProps;

/**
 * A vertical, roving-tabindex list of rows (built on `Composite`) — the primitive sidebars compose.
 * One tab stop for the whole list; arrow keys move between the focusable rows. Role-flexible: pass
 * the `role`/`aria-*` the context calls for (e.g. a navigation tree). Compose `ListItem` rows
 * inside.
 */
export function List(props: ListProps) {
  return <Composite className={listVariants()} {...props} />;
}
