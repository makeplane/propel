import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { Building2 } from "lucide-react";
import type * as React from "react";

import { getAvatarTone, getAvatarToneSeed } from "../../elements/avatar";
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
  /** Milliseconds before the fallback shows, to avoid a flash while `src` loads quickly. */
  delay?: number;
};

/**
 * The ready-made workspace avatar: a logo that falls back to initials, or an anonymous workspace
 * icon when there are no initials either, composed from the `elements/workspace-avatar` parts
 * (`WorkspaceAvatar` root + `WorkspaceAvatarImage` + `WorkspaceAvatarFallback`). Pass `src` for the
 * logo and `fallback` for initials; the initials color is chosen automatically and is not a
 * consumer prop.
 */
export function WorkspaceAvatar({
  magnitude,
  src,
  alt,
  fallback,
  delay,
  ...props
}: WorkspaceAvatarProps) {
  // Base UI shows the fallback whenever the logo is absent, loading, or failed, so the
  // colored-initials styling lives on the Fallback element itself. The anonymous workspace glyph is
  // the shared `Icon` (muted, static), sized by the `--node-size` the root sets per magnitude — no
  // workspace-specific icon part.
  const hasInitials = fallback != null;
  // Tone is always system-chosen (never a consumer prop): seed a stable color from the name, else
  // the initials text, so unnamed workspaces vary by initials instead of collapsing onto one color.
  const resolvedTone = getAvatarTone(getAvatarToneSeed(alt, fallback));
  // Named vs decorative: with an `alt`, expose one accessible name for every state (logo / initials)
  // via `role="img"`; without one, mark the avatar `aria-hidden` so it is skipped rather than
  // announced as a nameless image (the name lives in adjacent text). This is the only correct pair —
  // a `role="img"` with no name is an axe violation. (Matches `components/avatar`.)
  const a11y = alt != null ? { role: "img", "aria-label": alt } : { "aria-hidden": true };
  return (
    // Base UI's `Avatar` behavior grafts onto the styled `elements` parts via `render` (behavior part
    // outer, styled part as the render target). `{...props}` spreads before the hardcoded a11y attrs
    // so a stray same-named prop can never silently override them.
    <BaseAvatar.Root {...props} render={<WorkspaceAvatarElement magnitude={magnitude} />} {...a11y}>
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
