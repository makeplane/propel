import { Avatar as BaseAvatar } from "@base-ui/react/avatar";

import { avatarToneBgClass, avatarVariants, type AvatarVariantProps } from "./variants";

export type { AvatarMagnitude, AvatarVariantProps } from "./variants";

// The initials tone palette the designer defined for avatars (Figma label colors).
export const AVATAR_TONES = ["orange", "indigo", "emerald", "crimson", "pink", "purple"] as const;
export type AvatarTone = (typeof AVATAR_TONES)[number];

// Re-exported for callers (e.g. `WorkspaceAvatar`) that style their own fallback surface.
// The source of truth lives in `variants.ts`.
export const initialsToneClass: Record<AvatarTone, string> = avatarToneBgClass;

/**
 * Deterministically pick a tone from a seed (e.g. a name or user id) so the same person always gets
 * the same color — the "system picks it" behavior. Used as the default when `tone` is not set.
 */
export function getAvatarTone(seed: string): AvatarTone {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return AVATAR_TONES[Math.abs(hash) % AVATAR_TONES.length];
}

/** Props for {@link Avatar} (the Base UI `Avatar.Root`), plus a `magnitude`. */
export type AvatarProps = Omit<BaseAvatar.Root.Props, "className" | "style"> & AvatarVariantProps;

/**
 * The styled `Avatar.Root` — a single element that holds an `AvatarImage` and/or `AvatarFallback`.
 * Maps 1:1 to Base UI's `Avatar.Root`. For the ready-made image+initials+icon avatar, use the
 * `Avatar` from `@plane/propel/components/avatar`.
 */
export function Avatar({ magnitude, ...props }: AvatarProps) {
  return <BaseAvatar.Root className={avatarVariants({ magnitude })} {...props} />;
}
