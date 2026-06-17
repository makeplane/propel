import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { cva, cx, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { type AvatarTone, getAvatarTone, initialsToneClass } from "../avatar";

// Magnitudes follow the same scale as Avatar (Figma "Workspace avatar"): 2xs 16
// → 3xl 64. Square with a radius that grows with size: rounded-sm (16–24),
// rounded-md (28–40), rounded-lg (56–64). Border 1px up to 32px, 2px from 40px up.
const workspaceAvatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-clip border-subtle",
  {
    variants: {
      magnitude: {
        "2xs": "size-4 rounded-sm border-sm text-10",
        xs: "size-5 rounded-sm border-sm text-10",
        sm: "size-6 rounded-sm border-sm text-12",
        md: "size-7 rounded-md border-sm text-13",
        lg: "size-8 rounded-md border-sm text-16",
        xl: "size-10 rounded-md border-lg text-18",
        "2xl": "size-14 rounded-lg border-lg text-24",
        "3xl": "size-16 rounded-lg border-lg text-28",
      },
    },
  },
);

export type WorkspaceAvatarMagnitude = NonNullable<
  VariantProps<typeof workspaceAvatarVariants>["magnitude"]
>;

export type WorkspaceAvatarProps = Omit<
  React.ComponentProps<typeof BaseAvatar.Root>,
  "className" | "render" | "style"
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
