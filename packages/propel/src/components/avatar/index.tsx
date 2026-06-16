import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { User } from "lucide-react";
import * as React from "react";

// Magnitudes follow the Figma "Avatar" component scale (px): 2xs 16 → 3xl 64.
// Border is 1px (`border-sm`) up to 32px and 2px (`border-lg`) from 40px up.
const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-clip rounded-full border-subtle",
  {
    variants: {
      magnitude: {
        "2xs": "size-4 border-sm text-caption-2xs-regular",
        xs: "size-5 border-sm text-caption-sm-regular",
        sm: "size-6 border-sm text-caption-md-regular",
        md: "size-7 border-sm text-body-xs-regular",
        lg: "size-8 border-sm text-body-md-regular",
        xl: "size-10 border-lg text-h5-regular",
        "2xl": "size-14 border-lg text-h3-regular",
        "3xl": "size-16 border-lg text-h2-regular",
      },
    },
  },
);

export type AvatarMagnitude = NonNullable<VariantProps<typeof avatarVariants>["magnitude"]>;

/**
 * Set by `AvatarGroup` to give every avatar inside it the same `magnitude`, so a
 * group stays consistently sized. An avatar's own `magnitude` prop takes precedence.
 */
export const AvatarGroupContext = React.createContext<AvatarMagnitude | undefined>(undefined);

// The initials tone palette the designer defined for avatars (Figma label colors).
export const AVATAR_TONES = ["orange", "indigo", "emerald", "crimson", "pink", "purple"] as const;
export type AvatarTone = (typeof AVATAR_TONES)[number];

// Initials background per tone. The label colors are wired into `@theme inline`,
// so these are plain utilities. Exported so WorkspaceAvatar shares the same palette.
export const initialsToneClass: Record<AvatarTone, string> = {
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
  "className" | "render" | "style"
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
  // An explicit `magnitude` wins; otherwise inherit the group's (if inside one).
  // There is no default — size must come from the prop or an enclosing AvatarGroup.
  const groupMagnitude = React.useContext(AvatarGroupContext);
  const effectiveMagnitude = magnitude ?? groupMagnitude;
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
      // The `border-subtle` from `avatarVariants` is the avatar's only border. Inside
      // an AvatarGroup that same border separates overlapping siblings, matching
      // Figma's single `border/subtle` ring — there is no extra outer ring.
      className={cx(avatarVariants({ magnitude: effectiveMagnitude }), "bg-layer-1")}
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
            : "bg-layer-1 text-icon-placeholder",
        )}
      >
        {fallback ?? (
          <User
            aria-hidden
            className={effectiveMagnitude ? iconSizeByMagnitude[effectiveMagnitude] : undefined}
          />
        )}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}
