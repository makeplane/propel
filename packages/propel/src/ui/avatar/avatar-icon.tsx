import { type VariantProps } from "class-variance-authority";
import { User } from "lucide-react";
import type * as React from "react";

import { avatarIconVariants } from "./variants";

/** Props for {@link AvatarIcon}, plus the `magnitude` that sizes its glyph. */
export type AvatarIconProps = Omit<React.ComponentPropsWithoutRef<"span">, "className" | "style"> & {
  /**
   * Icon size step. Required — the anonymous glyph follows Figma's explicit per-magnitude icon px
   * values, not a fraction of the avatar, so the size has to be passed in.
   */
  magnitude: NonNullable<VariantProps<typeof avatarIconVariants>["magnitude"]>;
};

/**
 * The anonymous person-icon content state, shown when an avatar has neither an image nor initials.
 * A node-slot: it sizes its single child to the magnitude's icon size, so callers pass a bare icon.
 * Defaults to a person glyph; pass `children` to use a different one. Decorative (the `Avatar` root
 * carries the accessible name), so it is `aria-hidden`.
 */
export function AvatarIcon({ magnitude, children, ...props }: AvatarIconProps) {
  return (
    <span aria-hidden className={avatarIconVariants({ magnitude })} {...props}>
      {children ?? <User />}
    </span>
  );
}
