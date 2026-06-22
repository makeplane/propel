import { cva } from "class-variance-authority";

export const avatarImageVariants = cva("size-full object-cover");

// The fallback's `tone` colors the initials surface. `none` (the default) is the
// anonymous/icon state — neutral layer + muted placeholder icon. The named tones are
// the Figma avatar label colors (initials on a solid tone, white text). Exposing this
// as a variant lets a composition (`components/avatar`) style the fallback without a
// `className`.
export const avatarFallbackVariants = cva(
  "flex size-full items-center justify-center leading-none",
  {
    variants: {
      tone: {
        none: "bg-layer-1 text-icon-placeholder",
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
