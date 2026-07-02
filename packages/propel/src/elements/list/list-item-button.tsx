import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { listItemButtonVariants } from "./variants";

export type ListItemButtonProps = Omit<useRender.ComponentProps<"button">, "className" | "style">;

/**
 * The styled primary action of a list row — a `<button>`. Base-UI-agnostic — graft the roving
 * `CompositeItem` behavior in `components` via `<CompositeItem tag="button"
 * render={<ListItemButton/>} />`. Shares the row chrome with `ListItemLink`. Compose a
 * `ListItemIcon` + `ListItemLabel` inside.
 */
export function ListItemButton({ render, ...props }: ListItemButtonProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    type: "button",
    className: listItemButtonVariants(),
  };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
