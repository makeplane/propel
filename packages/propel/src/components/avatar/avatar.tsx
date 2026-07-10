import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { User } from "lucide-react";
import * as React from "react";

import {
  Avatar as AvatarElement,
  AvatarFallback,
  AvatarImage,
  type AvatarMagnitude,
  type AvatarProps as AvatarElementProps,
  getAvatarTone,
  getAvatarToneSeed,
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
  /** Milliseconds before the fallback shows, to avoid a flash while `src` loads quickly. */
  delay?: number;
};

/**
 * The ready-made avatar: an image that falls back to initials (or an anonymous person icon),
 * composed from the `elements/avatar` parts (`Avatar` root + `AvatarImage` + `AvatarFallback`).
 * Pass `src` for the photo and `fallback` for initials; the initials color is chosen automatically
 * and is not a consumer prop.
 */
export function Avatar({ magnitude, src, alt, fallback, delay, ...props }: AvatarProps) {
  // Base UI shows the fallback whenever the image is absent, loading, or failed, so the
  // colored-initials styling lives on the Fallback element itself. The anonymous person icon
  // renders in the icon slot over the root's neutral backdrop when there are no initials.
  const hasInitials = fallback != null;
  const groupMagnitude = React.useContext(AvatarGroupContext);
  const effectiveMagnitude = magnitude ?? groupMagnitude ?? "md";
  // The anonymous glyph is the shared `Icon` (muted, static — no input-focus brightening), sized by
  // the `--node-size` the root sets per magnitude, so there is no avatar-specific icon part.
  // Tone is always system-chosen (never a consumer prop): seed a stable color from the name, else
  // the initials text, so unnamed avatars vary by initials instead of collapsing onto one color.
  const resolvedTone = getAvatarTone(getAvatarToneSeed(alt, fallback));
  return (
    // `role="img"` + `aria-label` give the avatar one accessible name in every state
    // (image / initials / icon); the inner image is decorative. Base UI `Avatar` behavior/context
    // grafts onto the styled `elements/avatar` parts via `render` (behavior part outer). `{...props}`
    // spreads before the hardcoded `role`/`aria-label` so a stray same-named prop can never silently
    // override the `alt`-derived accessible name (matches `components/workspace-avatar`).
    <BaseAvatar.Root
      {...props}
      render={<AvatarElement magnitude={effectiveMagnitude} />}
      role="img"
      aria-label={alt}
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
