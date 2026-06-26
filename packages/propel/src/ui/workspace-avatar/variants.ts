import { cva, type VariantProps } from "class-variance-authority";

import { type StrictVariantProps } from "../../internal/variant-props";

// Magnitudes follow the same scale as Avatar (Figma "Workspace avatar"): 2xs 16
// → 3xl 64. Square with a radius that grows with size: rounded-sm (16–24),
// rounded-md (28–40), rounded-lg (56–64). Border 1px up to 32px, 2px from 40px up.
// `bg-layer-1` is the avatar's own neutral backdrop (shows behind a transparent fallback).
// The rounded-square shape (never circular) is always the same: it reads as a
// workspace, not a person.
export const workspaceAvatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-clip border-subtle bg-layer-1",
  {
    variants: {
      magnitude: {
        "2xs": "size-4 rounded-sm border-sm text-10",
        xs: "size-5 rounded-sm border-sm text-10",
        sm: "size-6 rounded-sm border-sm text-12",
        md: "size-7 rounded-md border-sm text-13",
        lg: "size-8 rounded-md border-sm text-16",
        xl: "size-10 rounded-md border-lg text-18",
        "2xl": "size-14 rounded-lg border-lg text-24",
        "3xl": "size-16 rounded-lg border-lg text-28",
      },
    },
  },
);

// The workspace logo image. Fills and crops to the square frame so non-square
// logos never stretch.
export const workspaceAvatarImageVariants = cva("size-full object-cover");

// The fallback's `tone` colors the initials surface. `none` (the default) is the
// anonymous/icon state — neutral layer + muted text. The named tones are the Figma
// avatar label colors (initials on a solid tone, white text). The same palette as
// `avatarFallbackVariants` in `ui/avatar`, specialised for workspace avatars.
export const workspaceAvatarFallbackVariants = cva(
  "flex size-full items-center justify-center leading-none",
  {
    variants: {
      tone: {
        none: "bg-layer-1 text-primary",
        orange: "bg-label-orange-bg-strong text-on-color",
        indigo: "bg-label-indigo-bg-strong text-on-color",
        emerald: "bg-label-emerald-bg-strong text-on-color",
        crimson: "bg-label-crimson-bg-strong text-on-color",
        pink: "bg-label-pink-bg-strong text-on-color",
        purple: "bg-label-purple-bg-strong text-on-color",
      },
    },
  },
);

export type WorkspaceAvatarMagnitude = NonNullable<
  VariantProps<typeof workspaceAvatarVariants>["magnitude"]
>;

export type WorkspaceAvatarVariantProps = StrictVariantProps<typeof workspaceAvatarVariants>;

export type WorkspaceAvatarFallbackVariantProps = StrictVariantProps<
  typeof workspaceAvatarFallbackVariants
>;
