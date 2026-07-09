import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type * as React from "react";

import { avatarVariants, type AvatarVariantProps } from "./variants";

export type { AvatarMagnitude } from "./variants";

// The initials tone palette the designer defined for avatars (Figma label colors).
export const AVATAR_TONES = ["orange", "indigo", "emerald", "crimson", "pink", "purple"] as const;
export type AvatarTone = (typeof AVATAR_TONES)[number];

/**
 * Deterministically pick a tone from a seed (e.g. a name or user id) so the same seed always gets
 * the same color — the "system picks it" behavior. Callers must pass a NON-EMPTY seed: an empty
 * string hashes to `0` and would collapse every seedless avatar onto the first tone, so the seed is
 * chosen by {@link resolveAvatarTone}, not here.
 */
export function getAvatarTone(seed: string): AvatarTone {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return AVATAR_TONES[Math.abs(hash) % AVATAR_TONES.length];
}

/**
 * Resolve an avatar's effective initials tone. An explicit `tone` always wins; otherwise the color
 * is derived from the most identifying non-empty value available — the `alt` name, or, when there
 * is no name, the initials text itself. Seeding from the initials (not `alt` alone) is what keeps
 * two unnamed avatars with different initials from collapsing onto the same color, while staying
 * stable: the same input always yields the same tone.
 */
export function resolveAvatarTone(
  tone: AvatarTone | undefined,
  alt: string | undefined,
  fallback: React.ReactNode,
): AvatarTone {
  if (tone) return tone;
  const seed = alt?.trim() || nodeToToneSeed(fallback);
  return getAvatarTone(seed);
}

// Only string/number children (initials like "AR", or a numeric id) carry a stable textual seed;
// any other node (an element, an array) has no meaningful string form, so it seeds nothing and the
// avatar falls back to the empty-seed tone — harmless, since a non-text fallback shows no initials.
function nodeToToneSeed(node: React.ReactNode): string {
  return typeof node === "string" || typeof node === "number" ? String(node).trim() : "";
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
