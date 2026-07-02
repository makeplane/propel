import { Composite, type CompositeProps } from "../../base/composite";
import { List as ListElement } from "../../elements/list/list";

export type ListProps = Omit<CompositeProps, "className" | "style" | "render">;

/**
 * A vertical roving-tabindex list — the primitive sidebars compose. Base UI's `Composite`
 * roving-focus behavior grafted onto the styled `elements` `List` element (rule 1a). One tab stop
 * for the whole list; arrow keys move between the focusable rows. Role-flexible: pass the
 * `role`/`aria-*` the context calls for. Compose `ListItem` rows inside.
 */
export function List(props: ListProps) {
  return <Composite {...props} render={<ListElement />} />;
}
