import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { badgeIconVariants } from "./variants";

export type BadgeIconProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The decorative leading icon at the badge's inline-start (the Figma badge icon). Sizes its single
 * child to the badge's `--node-size` and inherits the tone's text color, so callers pass a bare
 * icon. Decorative (the label carries the name), so it is `aria-hidden`.
 */
export function BadgeIcon({ render, ...props }: BadgeIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: badgeIconVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
