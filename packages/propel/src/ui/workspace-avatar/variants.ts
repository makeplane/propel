import { cva } from "class-variance-authority";

// Magnitudes follow the same scale as Avatar (Figma "Workspace avatar"): 2xs 16
// → 3xl 64. Square with a radius that grows with size: rounded-sm (16–24),
// rounded-md (28–40), rounded-lg (56–64). Border 1px up to 32px, 2px from 40px up.
export const workspaceAvatarVariants = cva(
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
