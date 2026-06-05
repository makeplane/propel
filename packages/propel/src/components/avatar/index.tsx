import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { User } from "lucide-react";
import type * as React from "react";

// Magnitudes follow the Figma "Avatar" documentation scale (px), named with
// Tailwind-style t-shirt abbreviations: 2xs 16 → 3xl 96. Border is 1px
// (`border-sm`) up to 32px and 2px (`border-lg`) from 40px up.
const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border-subtle bg-layer-1 text-secondary",
  {
    variants: {
      magnitude: {
        "2xs": "size-4 border-sm text-11",
        xs: "size-5 border-sm text-13",
        sm: "size-6 border-sm text-16",
        md: "size-8 border-sm text-20",
        lg: "size-10 border-lg text-24",
        xl: "size-14 border-lg text-28",
        "2xl": "size-16 border-lg text-32",
        "3xl": "size-24 border-lg text-40",
      },
    },
    defaultVariants: {
      magnitude: "md",
    },
  },
);

export type AvatarMagnitude = NonNullable<VariantProps<typeof avatarVariants>["magnitude"]>;

export interface AvatarProps extends Omit<
  React.ComponentProps<typeof BaseAvatar.Root>,
  "className" | "render"
> {
  /** Image URL. When omitted, or while it is loading/failing, the fallback shows. */
  src?: string;
  /** Accessible description for the image. */
  alt?: string;
  /** Initials shown when there is no image. When omitted too, a person icon shows. */
  fallback?: React.ReactNode;
  magnitude?: AvatarMagnitude;
}

export function Avatar({ magnitude, src, alt, fallback, ...props }: AvatarProps) {
  return (
    <BaseAvatar.Root className={avatarVariants({ magnitude })} {...props}>
      {src ? <BaseAvatar.Image src={src} alt={alt} className="size-full object-cover" /> : null}
      {/* Fallback chain (per the Figma docs): image → initials → person icon.
          The icon inherits the secondary text color via currentColor. */}
      <BaseAvatar.Fallback className="flex size-full items-center justify-center leading-none">
        {fallback ?? <User aria-hidden className="size-1/2" />}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}
