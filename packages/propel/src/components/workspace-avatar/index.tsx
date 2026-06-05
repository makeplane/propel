import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

// Magnitudes follow the same scale as Avatar (Figma docs), named with
// Tailwind-style t-shirt abbreviations: 2xs 16 → 3xl 96. Square with a radius
// that grows with size: rounded-sm (16–24), rounded-md (32–40), rounded-lg
// (56–96). Border is 1px up to 32px and 2px from 40px up.
// Workspace initials use `text-primary` (darker than the user Avatar's
// `text-secondary`) — per the Figma docs (node 40:206).
const workspaceAvatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden border-subtle bg-layer-1 text-primary",
  {
    variants: {
      magnitude: {
        "2xs": "size-4 rounded-sm border-sm text-11",
        xs: "size-5 rounded-sm border-sm text-13",
        sm: "size-6 rounded-sm border-sm text-16",
        md: "size-8 rounded-md border-sm text-20",
        lg: "size-10 rounded-md border-lg text-24",
        xl: "size-14 rounded-lg border-lg text-28",
        "2xl": "size-16 rounded-lg border-lg text-32",
        "3xl": "size-24 rounded-lg border-lg text-40",
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

export interface WorkspaceAvatarProps extends Omit<
  React.ComponentProps<typeof BaseAvatar.Root>,
  "className" | "render"
> {
  /** Workspace logo URL. Falls back to the initial when absent/loading/failed. */
  src?: string;
  /** Accessible description for the logo. */
  alt?: string;
  /** Shown when there is no logo — typically the workspace's initial. */
  fallback?: React.ReactNode;
  magnitude?: WorkspaceAvatarMagnitude;
}

export function WorkspaceAvatar({ magnitude, src, alt, fallback, ...props }: WorkspaceAvatarProps) {
  return (
    <BaseAvatar.Root className={workspaceAvatarVariants({ magnitude })} {...props}>
      {src ? <BaseAvatar.Image src={src} alt={alt} className="size-full object-cover" /> : null}
      <BaseAvatar.Fallback className="flex size-full items-center justify-center leading-none">
        {fallback}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}
