import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { navigationMenuLinkTitleVariants } from "./variants";

export type NavigationMenuLinkTitleProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The primary line of a `presentation="card"` `NavigationMenuLink`: the navigable label. Pairs with
 * an optional `NavigationMenuLinkDescription` below it.
 */
export function NavigationMenuLinkTitle({ render, ...props }: NavigationMenuLinkTitleProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: navigationMenuLinkTitleVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
