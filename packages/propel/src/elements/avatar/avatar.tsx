import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { avatarVariants, type AvatarVariantProps } from "./variants";

export type { AvatarMagnitude } from "./variants";

// The initials tone palette the designer defined for avatars (Figma label colors).
export const AVATAR_TONES = ["orange", "indigo", "emerald", "crimson", "pink", "purple"] as const;
export type AvatarTone = (typeof AVATAR_TONES)[number];

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

/** Props for {@link Avatar}, plus a `magnitude`. */
export type AvatarProps = Omit<useRender.ComponentProps<"span">, "className" | "style"> &
  AvatarVariantProps;

/**
 * The styled avatar container — a single `<span>` holding an `AvatarImage` and/or `AvatarFallback`.
 * Base-UI-agnostic; graft the Base UI `Avatar.Root` behavior/context in `components` via
 * `<BaseAvatar.Root render={<Avatar/>} />`. For the ready-made image+initials+icon avatar, use the
 * `Avatar` from `@makeplane/propel/components/avatar`.
 */
export function Avatar({ magnitude, render, ...props }: AvatarProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: avatarVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
