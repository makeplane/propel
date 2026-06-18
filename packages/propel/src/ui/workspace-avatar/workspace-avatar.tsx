import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { cx, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { type AvatarTone, getAvatarTone, initialsToneClass } from "../../ui/avatar";
import { workspaceAvatarVariants } from "./variants";

export type WorkspaceAvatarMagnitude = NonNullable<
  VariantProps<typeof workspaceAvatarVariants>["magnitude"]
>;

export type WorkspaceAvatarProps = Omit<
  React.ComponentProps<typeof BaseAvatar.Root>,
  "className" | "style"
> & {
  /** Workspace logo URL. Falls back to the initial when absent/loading/failed. */
  src?: string;
  /** Accessible name for the workspace avatar. */
  alt?: string;
  /** Shown when there is no logo — typically the workspace's initial. */
  fallback?: React.ReactNode;
  /** Initials background color. Defaults to a stable color derived from `alt`. */
  tone?: AvatarTone;
  /** Size of the avatar. Required — there is no default. */
  magnitude: WorkspaceAvatarMagnitude;
};

export function WorkspaceAvatar({
  magnitude,
  src,
  alt,
  fallback,
  tone,
  ...props
}: WorkspaceAvatarProps) {
  // The fallback shows whenever the logo is absent, loading, or failed, so its
  // styling lives on the Fallback element (not derived from `src`). Initials sit
  // on a label tone color (same palette as Avatar), auto-derived from `alt`.
  const hasInitials = fallback != null;
  const resolvedTone = tone ?? getAvatarTone(alt ?? "");
  return (
    <BaseAvatar.Root
      // One accessible name for the avatar in every state; the inner logo image is
      // decorative. Consumers can override via spread props.
      role="img"
      aria-label={alt}
      className={cx(workspaceAvatarVariants({ magnitude }), "bg-layer-1")}
      {...props}
    >
      {src ? <BaseAvatar.Image src={src} alt="" className="size-full object-cover" /> : null}
      <BaseAvatar.Fallback
        className={cx(
          "flex size-full items-center justify-center leading-none",
          hasInitials
            ? `${initialsToneClass[resolvedTone]} text-on-color`
            : "bg-layer-1 text-primary",
        )}
      >
        {fallback}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}
