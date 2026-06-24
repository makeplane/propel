import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { type VariantProps } from "class-variance-authority";

import { bannerVariants } from "./variants";

export type BannerVariant = NonNullable<VariantProps<typeof bannerVariants>["variant"]>;
export type BannerTone = NonNullable<VariantProps<typeof bannerVariants>["tone"]>;

// warning/danger are time-sensitive problems → `alert` (assertive). The calmer
// tones are advisory → `status` (polite). Picks the right live-region semantics.
const toneRole: Record<BannerTone, "status" | "alert"> = {
  neutral: "status",
  info: "status",
  accent: "status",
  warning: "alert",
  danger: "alert",
};

export type BannerProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> & {
  /** Figma Scope: a full-width page strip (`page`) or a self-contained card (`inline`). */
  variant: BannerVariant;
  /** Figma Intent: the banner's meaning/color. */
  tone: BannerTone;
};

/**
 * The banner strip/card. Lays out its parts (`BannerIcon`, `BannerBody`, `BannerActions`,
 * `BannerDismiss`) in a row. The `role`/`aria-live` come from the tone so assistive tech announces
 * problems assertively and advisories politely; consumers can override via spread.
 */
export function Banner({ variant, tone, render, ...props }: BannerProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    role: toneRole[tone],
    className: bannerVariants({ variant, tone }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
