import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { Building2 } from "lucide-react";
import type * as React from "react";

import { type AvatarTone, resolveAvatarTone } from "../../elements/avatar";
import {
  WorkspaceAvatar as WorkspaceAvatarElement,
  WorkspaceAvatarFallback,
  WorkspaceAvatarImage,
  type WorkspaceAvatarProps as WorkspaceAvatarElementProps,
} from "../../elements/workspace-avatar";
import { Icon } from "../../internal/icon";

export type WorkspaceAvatarProps = WorkspaceAvatarElementProps & {
  /** Workspace logo URL. Falls back to the initial when absent/loading/failed. */
  src?: string;
  /** Accessible name for the workspace avatar. */
  alt?: string;
  /**
   * Shown when there is no logo — typically the workspace's initial. When omitted too, an anonymous
   * workspace icon shows.
   */
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
 * The ready-made workspace avatar: a logo that falls back to initials, or an anonymous workspace
 * icon when there are no initials either, composed from the `elements/workspace-avatar` parts
 * (`WorkspaceAvatar` root + `WorkspaceAvatarImage` + `WorkspaceAvatarFallback`). Pass `src` for the
 * logo, `fallback` for initials, and optionally `tone` (otherwise derived from `alt`).
 */
export function WorkspaceAvatar({
  magnitude,
  src,
  alt,
  fallback,
  tone,
  delay,
  ...props
}: WorkspaceAvatarProps) {
  // Base UI shows the fallback whenever the logo is absent, loading, or failed, so the
  // colored-initials styling lives on the Fallback element itself. Initials = a label tone
  // color; the anonymous workspace glyph is the shared `Icon` (muted, static), sized by the
  // `--node-size` the root sets per magnitude — no workspace-specific icon part.
  const hasInitials = fallback != null;
  // The tone is auto-derived (from the name, else the initials) unless explicitly set, so each
  // workspace gets a stable, distinct color without the caller having to choose one.
  const resolvedTone = resolveAvatarTone(tone, alt, fallback);
  return (
    // Base UI's `Avatar` behavior grafts onto the styled `elements` parts via `render` (behavior part
    // outer, styled part as the render target). `role="img"` + `aria-label` give the avatar one
    // accessible name in every state (logo / initials); the inner image is decorative.
    <BaseAvatar.Root
      {...props}
      render={<WorkspaceAvatarElement magnitude={magnitude} />}
      role="img"
      aria-label={alt}
    >
      {src ? <BaseAvatar.Image render={<WorkspaceAvatarImage />} src={src} alt="" /> : null}
      {hasInitials ? (
        <BaseAvatar.Fallback delay={delay} render={<WorkspaceAvatarFallback tone={resolvedTone} />}>
          {fallback}
        </BaseAvatar.Fallback>
      ) : (
        <BaseAvatar.Fallback delay={delay} render={<Icon tint="muted" />}>
          <Building2 />
        </BaseAvatar.Fallback>
      )}
    </BaseAvatar.Root>
  );
}
