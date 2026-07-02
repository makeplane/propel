import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { listVariants } from "./variants";

export type ListProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled vertical list frame. Base-UI-agnostic — graft the roving-tabindex `Composite` behavior
 * in `components` via `<Composite render={<List/>} />`. Compose `ListItem` rows inside.
 */
export function List({ render, ...props }: ListProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: listVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
