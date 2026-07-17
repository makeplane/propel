import { cva, type VariantProps } from "class-variance-authority";

import { avatarFallbackClass, avatarImageClass, avatarTones } from "../../internal/avatar-shared";
import { type StrictVariantProps } from "../../internal/variant-props";

// Magnitudes follow the same scale as Avatar (Figma "Workspace avatar"): 2xs 16
// → 3xl 64. Square with a radius that grows with size: rounded-sm (16–24),
// rounded-md (28–40), rounded-lg (56–64). Border 1px up to 32px, 2px from 40px up.
// `bg-layer-1` is the avatar's own neutral backdrop (shows behind a transparent fallback).
// The rounded-square shape (never circular) is always the same: it reads as a
// workspace, not a person. `--node-size` is the anonymous icon glyph's size (matching Avatar's
// icon px scale); the fallback `<Icon>` inherits it from this root, so the icon is not a
// separate styled part.
export const workspaceAvatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-clip border-subtle bg-layer-1",
  {
    variants: {
      magnitude: {
        "2xs": "size-4 rounded-sm border-sm text-10 [--node-size:0.875rem]", // 14px glyph
        xs: "size-5 rounded-sm border-sm text-10 [--node-size:0.875rem]", // 14px
        sm: "size-6 rounded-sm border-sm text-12 [--node-size:1rem]", // 16px
        md: "size-7 rounded-md border-sm text-13 [--node-size:1.25rem]", // 20px
        lg: "size-8 rounded-md border-sm text-16 [--node-size:1.5rem]", // 24px
        xl: "size-10 rounded-md border-lg text-18 [--node-size:1.5rem]", // 24px
        "2xl": "size-14 rounded-lg border-lg text-24 [--node-size:2rem]", // 32px
        "3xl": "size-16 rounded-lg border-lg text-28 [--node-size:2rem]", // 32px
      },
    },
  },
);

// The workspace logo image. Fills and crops to the square frame so non-square
// logos never stretch.
export const workspaceAvatarImageVariants = cva(avatarImageClass);

// The fallback's `tone` colors the initials surface — always one of the six Figma avatar label
// colors (initials on a solid tone, white text); there is no neutral "none" tone and no
// `defaultVariants`, so `tone` is required. The anonymous/icon state is not this part at all: when
// there are no initials, the ready-made renders the shared `Icon` directly instead of
// `WorkspaceAvatarFallback`. The same palette as `avatarFallbackVariants` in `elements/avatar`,
// specialised for workspace avatars.
export const workspaceAvatarFallbackVariants = cva(avatarFallbackClass, {
  variants: {
    tone: avatarTones,
  },
});

export type WorkspaceAvatarMagnitude = NonNullable<
  VariantProps<typeof workspaceAvatarVariants>["magnitude"]
>;

export type WorkspaceAvatarVariantProps = StrictVariantProps<typeof workspaceAvatarVariants>;

export type WorkspaceAvatarFallbackVariantProps = StrictVariantProps<
  typeof workspaceAvatarFallbackVariants
>;
