import { cva, cx, type VariantProps } from "class-variance-authority";

// The inline text-link look (Figma "Link") shared by surfaces that *present as* a link: `Anchor`
// (an `<a>`) and `ButtonAnchor` (a `<button>` styled as a link). Underline + the link palette by
// `prominence` (blue primary / muted secondary), text size by `magnitude`. Carries both `disabled`
// (button) and `aria-disabled` (anchor) so it styles either element. Compose nothing — it is the
// whole look; each surface just renders its element with this className.
export const linkChromeVariants = cva(
  cx(
    "cursor-pointer rounded-xs underline underline-offset-2 transition-colors outline-none",
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
      magnitude: { sm: "text-12 leading-snug", md: "text-13", lg: "text-13", xl: "text-14" },
    },
  },
);

export type LinkChromeVariantProps = VariantProps<typeof linkChromeVariants>;
