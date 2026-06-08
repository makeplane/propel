import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { User } from "lucide-react";
import type * as React from "react";

// Magnitudes follow the Figma "Avatar" component scale (px): 2xs 16 → 3xl 64.
// Border is 1px (`border-sm`) up to 32px and 2px (`border-lg`) from 40px up.
const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border-subtle",
  {
    variants: {
      magnitude: {
        "2xs": "size-4 border-sm text-11",
        xs: "size-5 border-sm text-13",
        sm: "size-6 border-sm text-16",
        md: "size-7 border-sm text-16",
        lg: "size-8 border-sm text-20",
        xl: "size-10 border-lg text-24",
        "2xl": "size-14 border-lg text-28",
        "3xl": "size-16 border-lg text-32",
      },
    },
    defaultVariants: {
      magnitude: "md",
    },
  },
);

export type AvatarMagnitude = NonNullable<VariantProps<typeof avatarVariants>["magnitude"]>;

// The initials tone palette the designer defined for avatars (Figma label colors).
export const AVATAR_TONES = ["orange", "indigo", "emerald", "crimson", "pink", "purple"] as const;
export type AvatarTone = (typeof AVATAR_TONES)[number];

// Initials background per tone. The label colors are wired into `@theme inline`,
// so these are plain utilities.
const initialsToneClass: Record<AvatarTone, string> = {
  orange: "bg-label-orange-bg-strong",
  indigo: "bg-label-indigo-bg-strong",
  emerald: "bg-label-emerald-bg-strong",
  crimson: "bg-label-crimson-bg-strong",
  pink: "bg-label-pink-bg-strong",
  purple: "bg-label-purple-bg-strong",
};

/**
 * Deterministically pick a tone from a seed (e.g. a name or user id) so the same
 * person always gets the same color — the "system picks it" behavior. Used as the
 * default when `tone` is not set; pass `tone` to override.
 */
export function getAvatarTone(seed: string): AvatarTone {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return AVATAR_TONES[Math.abs(hash) % AVATAR_TONES.length];
}

// Person-icon (anonymous) sizes per magnitude, straight from Figma's "icon"
// values — an explicit px size at each step, not a fixed fraction of the avatar.
const iconSizeByMagnitude: Record<AvatarMagnitude, string> = {
  "2xs": "size-3.5", // 14px
  xs: "size-3.5", // 14px
  sm: "size-4", // 16px
  md: "size-5", // 20px
  lg: "size-6", // 24px
  xl: "size-6", // 24px
  "2xl": "size-8", // 32px
  "3xl": "size-8", // 32px
};

export type AvatarProps = Omit<
  React.ComponentProps<typeof BaseAvatar.Root>,
  "className" | "render"
> & {
  /** Image URL. When omitted, or while it is loading/failing, the fallback shows. */
  src?: string;
  /** Accessible name for the avatar (the person it represents). */
  alt?: string;
  /** Initials shown when there is no image. When omitted too, a person icon shows. */
  fallback?: React.ReactNode;
  /** Initials background color. Defaults to a stable color derived from `alt`. */
  tone?: AvatarTone;
  magnitude?: AvatarMagnitude;
};

export function Avatar({ magnitude, src, alt, fallback, tone, ...props }: AvatarProps) {
  // Base UI shows the fallback whenever the image is absent, loading, or failed,
  // so the colored-initials styling lives on the Fallback element itself — keying
  // it off `src` would miss the load/error case. Initials = a label tone color +
  // white text; the person icon = the neutral layer + a muted placeholder icon.
  const hasInitials = fallback != null;
  const resolvedMagnitude = magnitude ?? "md";
  // The tone is auto-derived from the name unless explicitly set, so each person
  // gets a stable color without the caller having to choose one.
  const resolvedTone = tone ?? getAvatarTone(alt ?? "");
  return (
    <BaseAvatar.Root
      // `role="img"` + `aria-label` give the avatar one accessible name in every
      // state (image / initials / icon); the inner image is decorative so there's
      // exactly one named image. Consumers can override via spread props.
      role="img"
      aria-label={alt}
      // `--avatar-ring` defaults to 0 (no ring); AvatarGroup sets it via an
      // inherited CSS var so each avatar draws its own white separator ring,
      // without the group reaching into its children.
      className={cx(
        avatarVariants({ magnitude }),
        "bg-layer-1 ring-[length:var(--avatar-ring,0px)] ring-inverse",
      )}
      {...props}
    >
      {src ? <BaseAvatar.Image src={src} alt="" className="size-full object-cover" /> : null}
      <BaseAvatar.Fallback
        className={cx(
          "flex size-full items-center justify-center leading-none",
          // Initials: tone label color + white text. Icon (anonymous): neutral
          // layer + the muted `placeholder` icon color (Figma `icon/placeholder`).
          hasInitials
            ? `${initialsToneClass[resolvedTone]} text-on-color`
            : "bg-layer-1 text-placeholder",
        )}
      >
        {fallback ?? <User aria-hidden className={iconSizeByMagnitude[resolvedMagnitude]} />}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}
