import type * as React from "react";

import { type AvatarTone, getAvatarTone } from "../../ui/avatar";
import {
  WorkspaceAvatar as WorkspaceAvatarRoot,
  WorkspaceAvatarFallback,
  WorkspaceAvatarImage,
  type WorkspaceAvatarProps as WorkspaceAvatarRootProps,
} from "../../ui/workspace-avatar";

export type WorkspaceAvatarProps = WorkspaceAvatarRootProps & {
  /** Workspace logo URL. Falls back to the initial when absent/loading/failed. */
  src?: string;
  /** Accessible name for the workspace avatar. */
  alt?: string;
  /** Shown when there is no logo — typically the workspace's initial. */
  fallback?: React.ReactNode;
  /** Initials background color. Defaults to a stable color derived from `alt`. */
  tone?: AvatarTone;
};

/**
 * The ready-made workspace avatar: a logo that falls back to initials, composed from the
 * `ui/workspace-avatar` parts (`WorkspaceAvatar` root + `WorkspaceAvatarImage` +
 * `WorkspaceAvatarFallback`). Pass `src` for the logo, `fallback` for initials, and optionally
 * `tone` (otherwise derived from `alt`).
 */
export function WorkspaceAvatar({
  magnitude,
  src,
  alt,
  fallback,
  tone,
  ...props
}: WorkspaceAvatarProps) {
  // Base UI shows the fallback whenever the logo is absent, loading, or failed, so the
  // colored-initials styling lives on the Fallback element itself. Initials = a label tone
  // color; the anonymous state = the neutral `none` tone.
  const hasInitials = fallback != null;
  // The tone is auto-derived from the name unless explicitly set, so each workspace gets a
  // stable color without the caller having to choose one.
  const resolvedTone = tone ?? getAvatarTone(alt ?? "");
  return (
    // `role="img"` + `aria-label` give the avatar one accessible name in every state
    // (logo / initials); the inner image is decorative.
    <WorkspaceAvatarRoot role="img" aria-label={alt} magnitude={magnitude} {...props}>
      {src ? <WorkspaceAvatarImage src={src} alt="" /> : null}
      <WorkspaceAvatarFallback tone={hasInitials ? resolvedTone : "none"}>
        {fallback}
      </WorkspaceAvatarFallback>
    </WorkspaceAvatarRoot>
  );
}
