import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { listItemLinkVariants } from "./variants";

export type ListItemLinkProps = Omit<useRender.ComponentProps<"a">, "className" | "style">;

/**
 * The styled primary navigation target of a list row — an `<a>`. Base-UI-agnostic — graft the
 * roving `CompositeItem` behavior in `components` via `<CompositeItem tag="a"
 * render={<ListItemLink/>} />`. Mark the current page with `aria-current="page"` (the wrapping
 * `ListItem` reads it for the selected look). Compose a `ListItemIcon` + `ListItemLabel` inside.
 */
export function ListItemLink({ render, ...props }: ListItemLinkProps) {
  const defaultProps: useRender.ElementProps<"a"> = { className: listItemLinkVariants() };
  return useRender({ defaultTagName: "a", render, props: mergeProps(defaultProps, props) });
}
