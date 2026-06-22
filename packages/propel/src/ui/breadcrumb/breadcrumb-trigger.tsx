import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cx } from "class-variance-authority";

import { crumbTriggerVariants, crumbVariants } from "./variants";

export type BreadcrumbTriggerProps = Omit<
  useRender.ComponentProps<"button">,
  "className" | "style"
> & {
  /** Adds a `group/trigger` marker so descendants can react to the open state. */
  group?: boolean;
};

/**
 * A crumb styled as a menu trigger — applies the interactive crumb chrome plus the open-state
 * styling. Compose a `Menu.Trigger` through the `render` prop.
 */
export function BreadcrumbTrigger({ group = false, render, ...props }: BreadcrumbTriggerProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    ...(render == null ? { type: "button" } : null),
    className: cx(crumbVariants({ interactive: true }), crumbTriggerVariants({ group })),
  };

  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps(props, defaultProps),
  });
}
