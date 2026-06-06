import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { User } from "lucide-react";
import type * as React from "react";

// Magnitudes follow the Figma "Avatar" component scale (px): 2xs 16 → 3xl 64.
// Border is 1px (`border-sm`) up to 32px and 2px (`border-lg`) from 40px up.
const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border-subtle",
  {
    variants: {
      magnitude: {
        "2xs": "size-4 border-sm text-11",
        xs: "size-5 border-sm text-13",
        sm: "size-6 border-sm text-16",
        md: "size-7 border-sm text-16",
        lg: "size-8 border-sm text-20",
        xl: "size-10 border-lg text-24",
        "2xl": "size-14 border-lg text-28",
        "3xl": "size-16 border-lg text-32",
      },
    },
    defaultVariants: {
      magnitude: "md",
    },
  },
);

export type AvatarMagnitude = NonNullable<VariantProps<typeof avatarVariants>["magnitude"]>;

export type AvatarProps = Omit<
  React.ComponentProps<typeof BaseAvatar.Root>,
  "className" | "render"
> & {
  /** Image URL. When omitted, or while it is loading/failing, the fallback shows. */
  src?: string;
  /** Accessible description for the image. */
  alt?: string;
  /** Initials shown when there is no image. When omitted too, a person icon shows. */
  fallback?: React.ReactNode;
  magnitude?: AvatarMagnitude;
};

export function Avatar({ magnitude, src, alt, fallback, ...props }: AvatarProps) {
  // Fallback chain (per the Figma docs): image → initials → person icon.
  const hasInitials = src == null && fallback != null;
  return (
    <BaseAvatar.Root
      // Initials sit on a static label color (Figma `label/orange/bg-strong`) with
      // white text; image/icon use the neutral layer with a muted icon. The label
      // primitive is referenced directly because only some label colors are wired
      // into `@theme inline` as utilities (orange is not).
      className={cx(
        avatarVariants({ magnitude }),
        hasInitials ? "bg-(--label-orange-bg-strong) text-on-color" : "bg-layer-1 text-secondary",
      )}
      {...props}
    >
      {src ? <BaseAvatar.Image src={src} alt={alt} className="size-full object-cover" /> : null}
      <BaseAvatar.Fallback className="flex size-full items-center justify-center leading-none">
        {fallback ?? <User aria-hidden className="size-1/2" />}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}
