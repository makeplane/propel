import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type AvatarIconVariantProps, avatarIconVariants } from "./variants";

export type { AvatarIconVariantProps } from "./variants";

/** Props for {@link AvatarIcon}, plus the `magnitude` that sizes its glyph. */
export type AvatarIconProps = Omit<useRender.ComponentProps<"span">, "className" | "style"> &
  AvatarIconVariantProps;

/**
 * The anonymous person-icon content state, shown when an avatar has neither an image nor initials.
 * A node-slot: it sizes its single child to the magnitude's icon size, so callers pass a bare icon.
 * Bakes no glyph — pass the icon as `children`. Decorative (the `Avatar` root carries the
 * accessible name), so it is `aria-hidden`.
 */
export function AvatarIcon({ magnitude, render, ...props }: AvatarIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: avatarIconVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
