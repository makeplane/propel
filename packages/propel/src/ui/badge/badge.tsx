import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type BadgeVariantProps, badgeVariants } from "./variants";

export type { BadgeMagnitude, BadgeTone } from "./variants";

export type BadgeProps = Omit<useRender.ComponentProps<"span">, "className" | "style"> &
  BadgeVariantProps;

/**
 * The badge pill: the styled inline-flex container. Compose a `BadgeIcon`, `BadgeLabel`, and/or
 * `BadgeDismiss` inside it (or use the ready-made `components/badge` composition). Sets the tone's
 * text color and the magnitude's `--node-size`, which its slot children inherit.
 */
export function Badge({ tone, magnitude, render, ...props }: BadgeProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: badgeVariants({ tone, magnitude }),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
