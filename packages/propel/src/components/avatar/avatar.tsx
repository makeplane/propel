import { User } from "lucide-react";
import * as React from "react";

import {
  Avatar as AvatarElement,
  AvatarFallback,
  AvatarIcon,
  AvatarImage,
  type AvatarMagnitude,
  type AvatarProps as AvatarElementProps,
  type AvatarTone,
  getAvatarTone,
} from "../../ui/avatar";
import { AvatarGroupContext } from "./avatar-group-context";

export type AvatarProps = Omit<AvatarElementProps, "magnitude"> & {
  /** Avatar size. Optional here — resolved from the `AvatarGroup` context, else `md`. */
  magnitude?: AvatarMagnitude;
  /** Image URL. When omitted, or while it is loading/failing, the fallback shows. */
  src?: string;
  /** Accessible name for the avatar (the person it represents). */
  alt?: string;
  /** Initials shown when there is no image. When omitted too, a person icon shows. */
  fallback?: React.ReactNode;
  /** Initials background color. Defaults to a stable color derived from `alt`. */
  tone?: AvatarTone;
};

/**
 * The ready-made avatar: an image that falls back to initials (or an anonymous person icon),
 * composed from the `ui/avatar` parts (`Avatar` root + `AvatarImage` + `AvatarFallback`). Pass
 * `src` for the photo, `fallback` for initials, and optionally `tone` (otherwise derived from
 * `alt`).
 */
export function Avatar({ magnitude, src, alt, fallback, tone, ...props }: AvatarProps) {
  // Base UI shows the fallback whenever the image is absent, loading, or failed, so the
  // colored-initials styling lives on the Fallback element itself. Initials = a label tone
  // color; the anonymous person icon = the neutral `none` tone.
  const hasInitials = fallback != null;
  const groupMagnitude = React.useContext(AvatarGroupContext);
  const effectiveMagnitude = magnitude ?? groupMagnitude ?? "md";
  // The tone is auto-derived from the name unless explicitly set, so each person gets a
  // stable color without the caller having to choose one.
  const resolvedTone = tone ?? getAvatarTone(alt ?? "");
  return (
    // `role="img"` + `aria-label` give the avatar one accessible name in every state
    // (image / initials / icon); the inner image is decorative.
    <AvatarElement role="img" aria-label={alt} magnitude={effectiveMagnitude} {...props}>
      {src ? <AvatarImage src={src} alt="" /> : null}
      <AvatarFallback tone={hasInitials ? resolvedTone : "none"}>
        {fallback ?? (
          <AvatarIcon magnitude={effectiveMagnitude}>
            <User />
          </AvatarIcon>
        )}
      </AvatarFallback>
    </AvatarElement>
  );
}
