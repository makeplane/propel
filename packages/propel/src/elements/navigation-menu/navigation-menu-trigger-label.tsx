import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { navigationMenuTriggerLabelVariants } from "./variants";

export type NavigationMenuTriggerLabelProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The trigger's text label, sitting beside the disclosure `NavigationMenuIcon`. Splitting the label
 * into its own styled part keeps `NavigationMenuTrigger` a single styled element that composes
 * parts rather than baking in raw text.
 */
export function NavigationMenuTriggerLabel({ render, ...props }: NavigationMenuTriggerLabelProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: navigationMenuTriggerLabelVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
