import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { navigationMenuLinkDescriptionVariants } from "./variants";

export type NavigationMenuLinkDescriptionProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The optional secondary line of a `presentation="card"` `NavigationMenuLink`: a muted description
 * shown below the `NavigationMenuLinkTitle`.
 */
export function NavigationMenuLinkDescription({
  render,
  ...props
}: NavigationMenuLinkDescriptionProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: navigationMenuLinkDescriptionVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
