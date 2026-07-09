import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { User } from "lucide-react";
import * as React from "react";

import {
  Avatar as AvatarElement,
  AvatarFallback,
  AvatarImage,
  type AvatarMagnitude,
  type AvatarProps as AvatarElementProps,
  type AvatarTone,
  resolveAvatarTone,
} from "../../elements/avatar";
import { Icon } from "../../internal/icon";
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
  /**
   * Initials background color. Defaults to a stable color derived from `alt`, or the initials when
   * there is no `alt`.
   */
  tone?: AvatarTone;
  /** Milliseconds before the fallback shows, to avoid a flash while `src` loads quickly. */
  delay?: number;
};

/**
 * The ready-made avatar: an image that falls back to initials (or an anonymous person icon),
 * composed from the `elements/avatar` parts (`Avatar` root + `AvatarImage` + `AvatarFallback`).
 * Pass `src` for the photo, `fallback` for initials, and optionally `tone` (otherwise derived from
 * `alt`).
 */
export function Avatar({ magnitude, src, alt, fallback, tone, delay, ...props }: AvatarProps) {
  // Base UI shows the fallback whenever the image is absent, loading, or failed, so the
  // colored-initials styling lives on the Fallback element itself. Initials = a label tone
  // color; the anonymous person icon renders in the icon slot over the root's neutral backdrop
  // (there is no "none" tone).
  const hasInitials = fallback != null;
  const groupMagnitude = React.useContext(AvatarGroupContext);
  const effectiveMagnitude = magnitude ?? groupMagnitude ?? "md";
  // The anonymous glyph is the shared `Icon` (muted, static — no input-focus brightening), sized by
  // the `--node-size` the root sets per magnitude, so there is no avatar-specific icon part.
  // The tone is auto-derived (from the name, else the initials) unless explicitly set, so each
  // person gets a stable, distinct color without the caller having to choose one.
  const resolvedTone = resolveAvatarTone(tone, alt, fallback);
  return (
    // `role="img"` + `aria-label` give the avatar one accessible name in every state
    // (image / initials / icon); the inner image is decorative. Base UI `Avatar` behavior/context
    // grafts onto the styled `elements/avatar` parts via `render` (behavior part outer).
    <BaseAvatar.Root
      role="img"
      aria-label={alt}
      {...props}
      render={<AvatarElement magnitude={effectiveMagnitude} />}
    >
      {src ? <BaseAvatar.Image render={<AvatarImage />} src={src} alt="" /> : null}
      {hasInitials ? (
        <BaseAvatar.Fallback delay={delay} render={<AvatarFallback tone={resolvedTone} />}>
          {fallback}
        </BaseAvatar.Fallback>
      ) : (
        <BaseAvatar.Fallback delay={delay} render={<Icon tint="muted" />}>
          <User />
        </BaseAvatar.Fallback>
      )}
    </BaseAvatar.Root>
  );
}
