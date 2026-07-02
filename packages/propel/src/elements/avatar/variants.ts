import { cva, cx, type VariantProps } from "class-variance-authority";

import { avatarFallbackClass, avatarImageClass, avatarTones } from "../../internal/avatar-shared";
import { nodeSlotClass } from "../../internal/node-slot";
import { type StrictVariantProps } from "../../internal/variant-props";

export const avatarImageVariants = cva(avatarImageClass);

// The fallback's `tone` colors the initials surface. `none` (the default) is the
// anonymous/icon state — neutral layer + muted placeholder icon. The named tones are
// the Figma avatar label colors (initials on a solid tone, white text). Exposing this
// as a variant lets a composition (`components/avatar`) style the fallback without a
// `className`.
export const avatarFallbackVariants = cva(avatarFallbackClass, {
  variants: {
    tone: avatarTones,
  },
});

// Magnitudes follow the Figma "Avatar" component scale (px): 2xs 16 → 3xl 64.
// Border is 1px (`border-sm`) up to 32px and 2px (`border-lg`) from 40px up.
// `bg-layer-1` is the avatar's own neutral backdrop (shows behind a transparent fallback).
export const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-clip rounded-full border-subtle bg-layer-1",
  {
    variants: {
      magnitude: {
        "2xs": "size-4 border-sm text-caption-2xs-regular",
        xs: "size-5 border-sm text-11",
        sm: "size-6 border-sm text-12",
        md: "size-7 border-sm text-13",
        lg: "size-8 border-sm text-16",
        xl: "size-10 border-lg text-18",
        "2xl": "size-14 border-lg text-24",
        "3xl": "size-16 border-lg text-28",
      },
    },
  },
);

// Initials background utility per tone — the same palette as `avatarFallbackVariants`
// but exposed as a plain map for consumers (e.g. WorkspaceAvatar) that style their own
// fallback surface without using `AvatarFallback`. All className decisions live here in
// variants.ts, not scattered across component files.
export const avatarToneBgClass = {
  orange: "bg-label-orange-bg-strong",
  indigo: "bg-label-indigo-bg-strong",
  emerald: "bg-label-emerald-bg-strong",
  crimson: "bg-label-crimson-bg-strong",
  pink: "bg-label-pink-bg-strong",
  purple: "bg-label-purple-bg-strong",
} as const;

// The anonymous person-icon slot (the Figma "icon" content state). A node-slot: it
// sizes whatever single child it's given to the inherited `--node-size`, never baking a
// size onto the child. `--node-size` is set per magnitude from Figma's explicit "icon"
// px values (not a fixed fraction of the avatar), and the glyph is tinted muted.
export const avatarIconVariants = cva(cx(nodeSlotClass, "text-icon-placeholder"), {
  variants: {
    magnitude: {
      "2xs": "[--node-size:0.875rem]", // 14px
      xs: "[--node-size:0.875rem]", // 14px
      sm: "[--node-size:1rem]", // 16px
      md: "[--node-size:1.25rem]", // 20px
      lg: "[--node-size:1.5rem]", // 24px
      xl: "[--node-size:1.5rem]", // 24px
      "2xl": "[--node-size:2rem]", // 32px
      "3xl": "[--node-size:2rem]", // 32px
    },
  },
});

type AvatarVariantConfig = VariantProps<typeof avatarVariants>;
export type AvatarMagnitude = NonNullable<AvatarVariantConfig["magnitude"]>;
export type AvatarVariantProps = StrictVariantProps<typeof avatarVariants>;

export type AvatarFallbackTone = NonNullable<VariantProps<typeof avatarFallbackVariants>["tone"]>;
export type AvatarFallbackVariantProps = StrictVariantProps<typeof avatarFallbackVariants>;

export type AvatarIconVariantProps = StrictVariantProps<typeof avatarIconVariants>;
