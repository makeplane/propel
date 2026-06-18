import { cx, type VariantProps } from "class-variance-authority";
import { CircleAlert, Info, Megaphone, TriangleAlert, X, type LucideIcon } from "lucide-react";
import * as React from "react";

import { NodeSlot } from "../../internal/node-slot";
import { bannerVariants } from "./variants";

type BannerVariant = NonNullable<VariantProps<typeof bannerVariants>["variant"]>;
export type BannerTone = NonNullable<VariantProps<typeof bannerVariants>["tone"]>;

// Foreground (title + default icon) color per tone, mapped from the Figma
// `text/*` and `icon/*` tokens to propel's semantic text utilities.
// The title uses the `primary` tone text token. For danger and warning the `secondary`
// step (red/700, amber/700) does not meet WCAG AA against its own soft tone background,
// so per design those banners use the darker primary text and icon tokens.
const toneTextClass: Record<BannerTone, string> = {
  neutral: "text-secondary",
  info: "text-info-primary",
  accent: "text-accent-primary",
  warning: "text-warning-primary",
  danger: "text-danger-primary",
};

const toneIconClass: Record<BannerTone, string> = {
  neutral: "text-icon-secondary",
  info: "text-icon-info-secondary",
  accent: "text-icon-accent-primary",
  warning: "text-icon-warning-primary",
  danger: "text-icon-danger-primary",
};

// The leading icon the system picks per tone when none is supplied. Treated as
// content (overridable via `icon`), not a style variant.
const toneIcon: Record<BannerTone, LucideIcon> = {
  neutral: Info,
  info: Info,
  accent: Megaphone,
  warning: TriangleAlert,
  danger: CircleAlert,
};

// warning/danger are time-sensitive problems → `alert` (assertive). The calmer
// tones are advisory → `status` (polite). Picks the right live-region semantics.
const toneRole: Record<BannerTone, "status" | "alert"> = {
  neutral: "status",
  info: "status",
  accent: "status",
  warning: "alert",
  danger: "alert",
};

export type BannerProps = Omit<React.ComponentProps<"div">, "className" | "style"> & {
  /** Figma Scope: a full-width page strip (`page`) or a self-contained card (`inline`). */
  variant: BannerVariant;
  /** Figma Intent: the banner's meaning/color. */
  tone: BannerTone;
  /**
   * Node rendered before the message (inline-start). Defaults to a tone-appropriate lucide icon;
   * pass `null` to hide it. Sized to the banner's `--node-size`. Decorative, kept out of the name.
   */
  inlineStartNode?: React.ReactNode;
  /** The banner's headline. Rendered as its own block above any `children` body. */
  title?: React.ReactNode;
  /** Trailing actions (e.g. buttons), placed after the message. */
  actions?: React.ReactNode;
  /** When provided, shows a dismiss button that calls this on click. */
  onDismiss?: () => void;
};

export function Banner({
  variant,
  tone,
  inlineStartNode,
  title,
  actions,
  onDismiss,
  children,
  ...props
}: BannerProps) {
  // The page banner uses a 20px icon and a medium-weight message; the inline
  // banner uses a 16px icon and a regular-weight message (per Figma typography).
  const iconSize = variant === "page" ? "size-5" : "size-4";
  const nodeSizeVar = variant === "page" ? "[--node-size:1.25rem]" : "[--node-size:1rem]";
  const textWeight = variant === "page" ? "font-medium" : "font-normal";
  const DefaultIcon = toneIcon[tone];
  return (
    <div
      // `role`/`aria-live` come from the tone so assistive tech announces problems
      // assertively and advisories politely; consumers can override via spread.
      role={toneRole[tone]}
      className={cx(bannerVariants({ variant, tone }))}
      {...props}
    >
      {inlineStartNode === undefined ? (
        <DefaultIcon aria-hidden className={cx("shrink-0", iconSize, toneIconClass[tone])} />
      ) : inlineStartNode ? (
        <NodeSlot aria-hidden className={cx(nodeSizeVar, toneIconClass[tone])}>
          {inlineStartNode}
        </NodeSlot>
      ) : null}
      <div
        className={cx("min-w-0 flex-1 text-14 leading-relaxed", textWeight, toneTextClass[tone])}
      >
        {title ? <div>{title}</div> : null}
        {children ? <div className={cx(title ? "mt-1" : undefined)}>{children}</div> : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
      {onDismiss ? (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          className={cx(
            "flex shrink-0 items-center justify-center rounded-md p-1 text-icon-tertiary",
            "hover:bg-layer-1",
          )}
        >
          <X aria-hidden className="size-4" />
        </button>
      ) : null}
    </div>
  );
}
