import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { cva, cx, type VariantProps } from "class-variance-authority";
import type * as React from "react";

// Magnitudes follow the same scale as Avatar (Figma "Workspace avatar"): 2xs 16
// → 3xl 64. Square with a radius that grows with size: rounded-sm (16–24),
// rounded-md (28–40), rounded-lg (56–64). Border 1px up to 32px, 2px from 40px up.
const workspaceAvatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden border-subtle",
  {
    variants: {
      magnitude: {
        "2xs": "size-4 rounded-sm border-sm text-11",
        xs: "size-5 rounded-sm border-sm text-13",
        sm: "size-6 rounded-sm border-sm text-16",
        md: "size-7 rounded-md border-sm text-20",
        lg: "size-8 rounded-md border-sm text-20",
        xl: "size-10 rounded-md border-lg text-24",
        "2xl": "size-14 rounded-lg border-lg text-28",
        "3xl": "size-16 rounded-lg border-lg text-32",
      },
    },
    defaultVariants: {
      magnitude: "md",
    },
  },
);

export type WorkspaceAvatarMagnitude = NonNullable<
  VariantProps<typeof workspaceAvatarVariants>["magnitude"]
>;

export type WorkspaceAvatarProps = Omit<
  React.ComponentProps<typeof BaseAvatar.Root>,
  "className" | "render"
> & {
  /** Workspace logo URL. Falls back to the initial when absent/loading/failed. */
  src?: string;
  /** Accessible name for the workspace avatar. */
  alt?: string;
  /** Shown when there is no logo — typically the workspace's initial. */
  fallback?: React.ReactNode;
  magnitude?: WorkspaceAvatarMagnitude;
};

export function WorkspaceAvatar({ magnitude, src, alt, fallback, ...props }: WorkspaceAvatarProps) {
  // Initials sit on a static label color (Figma `label/indigo/bg-strong`) with
  // white text; with a logo, the neutral layer shows behind it.
  const hasInitials = src == null && fallback != null;
  return (
    <BaseAvatar.Root
      // One accessible name for the avatar in every state; the inner logo image is
      // decorative. Consumers can override via spread props.
      role="img"
      aria-label={alt}
      className={cx(
        workspaceAvatarVariants({ magnitude }),
        hasInitials ? "bg-(--label-indigo-bg-strong) text-on-color" : "bg-layer-1 text-primary",
      )}
      {...props}
    >
      {src ? <BaseAvatar.Image src={src} alt="" className="size-full object-cover" /> : null}
      <BaseAvatar.Fallback className="flex size-full items-center justify-center leading-none">
        {fallback}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}
