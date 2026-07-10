import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";

import { avatarVariants, type AvatarVariantProps } from "./variants";

export type { AvatarMagnitude } from "./variants";

// The initials tone palette the designer defined for avatars (Figma label colors).
export const AVATAR_TONES = ["orange", "indigo", "emerald", "crimson", "pink", "purple"] as const;
export type AvatarTone = (typeof AVATAR_TONES)[number];

/**
 * Deterministically pick a tone from a seed (e.g. a name or the initials) so the same seed always
 * gets the same color — tone is always system-chosen, never a consumer prop. Callers pass a
 * NON-EMPTY seed: an empty string hashes to `0` and would collapse every seedless avatar onto the
 * first tone, so the ready-made derives the seed (the name, else the initials) before calling in —
 * via {@link getAvatarToneSeed}.
 */
export function getAvatarTone(seed: string): AvatarTone {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return AVATAR_TONES[Math.abs(hash) % AVATAR_TONES.length];
}

/**
 * Derives the {@link getAvatarTone} seed from whichever of `alt`/`fallback` carries text: the
 * accessible name first, else the fallback content itself when it's plain text (a string or
 * number), else the fallback's own text child when it wraps one (e.g. `<span>AL</span>`). A
 * `fallback` with no extractable text (an icon glyph, a multi-child node) has no signal to vary by,
 * so every such instance shares one tone — an accepted limit, not a silent bug, since it's
 * documented here rather than falling through to an empty-string seed (which would always collapse
 * onto the first tone regardless of what the fallback actually is).
 */
export function getAvatarToneSeed(alt: string | undefined, fallback: React.ReactNode): string {
  const trimmedAlt = alt?.trim();
  if (trimmedAlt) return trimmedAlt;
  if (typeof fallback === "string" || typeof fallback === "number") return String(fallback).trim();
  if (React.isValidElement<{ children?: React.ReactNode }>(fallback)) {
    const { children } = fallback.props;
    if (typeof children === "string" || typeof children === "number")
      return String(children).trim();
  }
  return "";
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
