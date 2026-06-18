import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import { avatarVariants } from "./variants";

export type AvatarMagnitude = NonNullable<VariantProps<typeof avatarVariants>["magnitude"]>;

/**
 * Set by `AvatarGroup` to give every avatar inside it the same `magnitude`, so a group stays
 * consistently sized. An avatar's own `magnitude` prop takes precedence.
 */
export const AvatarGroupContext = React.createContext<AvatarMagnitude | undefined>(undefined);

// The initials tone palette the designer defined for avatars (Figma label colors).
export const AVATAR_TONES = ["orange", "indigo", "emerald", "crimson", "pink", "purple"] as const;
export type AvatarTone = (typeof AVATAR_TONES)[number];

// Initials background per tone, kept for callers that style their own fallback surface
// (e.g. `WorkspaceAvatar`). `AvatarFallback`'s `tone` variant carries the same palette.
export const initialsToneClass: Record<AvatarTone, string> = {
  orange: "bg-label-orange-bg-strong",
  indigo: "bg-label-indigo-bg-strong",
  emerald: "bg-label-emerald-bg-strong",
  crimson: "bg-label-crimson-bg-strong",
  pink: "bg-label-pink-bg-strong",
  purple: "bg-label-purple-bg-strong",
};

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
export type AvatarProps = Omit<
  React.ComponentProps<typeof BaseAvatar.Root>,
  "className" | "style"
> & {
  /**
   * Avatar size. Optional because an `Avatar` inside an `AvatarGroup` inherits the group's
   * magnitude; standalone it falls back to `md`.
   */
  magnitude?: AvatarMagnitude;
};

/**
 * The styled `Avatar.Root` — a single element that holds an `AvatarImage` and/or `AvatarFallback`.
 * Maps 1:1 to Base UI's `Avatar.Root`. For the ready-made image+initials+icon avatar, use the
 * `Avatar` from `@plane/propel/components/avatar`.
 */
export function Avatar({ magnitude, ...props }: AvatarProps) {
  // An explicit `magnitude` wins; otherwise inherit the group's; a standalone avatar with
  // neither falls back to `md` so it always has a size.
  const groupMagnitude = React.useContext(AvatarGroupContext);
  const effectiveMagnitude = magnitude ?? groupMagnitude ?? "md";
  return (
    <BaseAvatar.Root className={avatarVariants({ magnitude: effectiveMagnitude })} {...props} />
  );
}
