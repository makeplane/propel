import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { navigationMenuContentListVariants } from "./variants";

export type NavigationMenuContentListProps = Omit<
  useRender.ComponentProps<"ul">,
  "className" | "style"
>;

/**
 * The styled vertical list of links inside a `NavigationMenuContent` panel. Stacks its items with a
 * consistent gap; the surrounding `NavigationMenuPopup` owns the padding. Renders a `<ul>`, so each
 * child link belongs in its own `<li>`.
 */
export function NavigationMenuContentList({ render, ...props }: NavigationMenuContentListProps) {
  const defaultProps: useRender.ElementProps<"ul"> = {
    className: navigationMenuContentListVariants(),
  };
  return useRender({ defaultTagName: "ul", render, props: mergeProps(defaultProps, props) });
}
