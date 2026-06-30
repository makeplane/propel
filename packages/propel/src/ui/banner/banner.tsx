import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type BannerTone, type BannerVariantProps, bannerVariants } from "./variants";

export type { BannerTone, BannerPlacement } from "./variants";

// warning/danger are time-sensitive problems → `alert` (assertive). The calmer
// tones are advisory → `status` (polite). Picks the right live-region semantics.
const toneRole: Record<BannerTone, "status" | "alert"> = {
  neutral: "status",
  info: "status",
  accent: "status",
  warning: "alert",
  danger: "alert",
};

export type BannerProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  BannerVariantProps;

/**
 * The banner strip/card. Lays out its parts (`BannerIcon`, `BannerBody`, `BannerActions`, and an
 * optional dismiss `IconButton`) in a row. The `role`/`aria-live` come from the tone so assistive
 * tech announces problems assertively and advisories politely; consumers can override via spread.
 */
export function Banner({ placement, tone, render, ...props }: BannerProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    role: toneRole[tone],
    className: bannerVariants({ placement, tone }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
