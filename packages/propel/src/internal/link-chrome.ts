import { cva, cx, type VariantProps } from "class-variance-authority";

// The inline text-link look (Figma "Link"): `AnchorButton` wears it — a `<button>` action by
// default, or a real `<a>` via `render`/`nativeButton={false}`. The link palette is by
// `variant` (blue primary / muted secondary), text size by `size`. Underline lives on the
// label part (Figma: underline spans the text only, not the flanking icons). Carries both
// `disabled` (button) and `aria-disabled` (anchor) so it styles either element. Compose nothing —
// it is the whole look; each surface just renders its element with this className.
export const linkChromeVariants = cva(
  cx(
    "group inline-flex cursor-pointer items-center gap-1 rounded-xs transition-colors outline-none",
    "focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-1",
    // Figma disabled keeps the underline — only the color mutes to `text-disabled`.
    "disabled:cursor-not-allowed disabled:text-disabled",
    "aria-disabled:cursor-not-allowed aria-disabled:text-disabled",
    "aria-busy:cursor-default aria-busy:text-disabled",
  ),
  {
    variants: {
      variant: {
        primary: "text-link-primary hover:text-link-primary-hover",
        // The muted link rests at `tertiary` and darkens two steps to `primary` on hover — a wider
        // default→hover gap than `secondary`→`primary` gave, so the hover reads clearly.
        secondary: "text-tertiary hover:text-primary",
      },
      // Inline text has no height/padding, so text size is the ONLY size cue — the scale must step
      // the font itself at every size (unlike `buttonGeometryVariants`, where the button
      // height carries the step and `md`/`lg` can share a font size). One distinct token per step:
      // 12·13·14·16.
      size: {
        sm: "text-12 leading-snug [--node-size:0.75rem]",
        md: "text-13 [--node-size:0.875rem]",
        lg: "text-14 [--node-size:1rem]",
        xl: "text-16 [--node-size:1.25rem]",
      },
    },
  },
);

export type LinkChromeVariantProps = VariantProps<typeof linkChromeVariants>;
