import { cva, cx, type VariantProps } from "class-variance-authority";

// The inline text-link look (Figma "Link"): `AnchorButton` wears it — a `<button>` action by
// default, or a real `<a>` via `render`/`nativeButton={false}`. Underline + the link palette by
// `prominence` (blue primary / muted secondary), text size by `magnitude`. Carries both `disabled`
// (button) and `aria-disabled` (anchor) so it styles either element. Compose nothing — it is the
// whole look; each surface just renders its element with this className.
export const linkChromeVariants = cva(
  cx(
    "group inline-flex cursor-pointer items-center gap-1 rounded-xs underline underline-offset-2 transition-colors outline-none",
    "focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-1",
    "disabled:cursor-not-allowed disabled:text-disabled disabled:no-underline",
    "aria-disabled:cursor-not-allowed aria-disabled:text-disabled aria-disabled:no-underline",
  ),
  {
    variants: {
      prominence: {
        primary: "text-link-primary hover:text-link-primary-hover",
        secondary: "text-secondary hover:text-primary",
      },
      magnitude: {
        sm: "text-12 leading-snug [--node-size:0.75rem]",
        md: "text-13 [--node-size:0.875rem]",
        lg: "text-13 [--node-size:0.875rem]",
        xl: "text-14 [--node-size:1rem]",
      },
    },
  },
);

export type LinkChromeVariantProps = VariantProps<typeof linkChromeVariants>;
