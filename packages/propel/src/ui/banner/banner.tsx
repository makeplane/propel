import { type VariantProps } from "class-variance-authority";
import { CircleAlert, Info, Megaphone, TriangleAlert, X, type LucideIcon } from "lucide-react";
import * as React from "react";

import {
  bannerActionsVariants,
  bannerBodyVariants,
  bannerDismissVariants,
  bannerIconNodeVariants,
  bannerIconVariants,
  bannerVariants,
} from "./variants";

type BannerVariant = NonNullable<VariantProps<typeof bannerVariants>["variant"]>;
export type BannerTone = NonNullable<VariantProps<typeof bannerVariants>["tone"]>;

// The leading icon the system picks per tone when none is supplied. Treated as
// content (overridable via `inlineStartNode`), not a style variant.
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
  const DefaultIcon = toneIcon[tone];
  return (
    <div
      // `role`/`aria-live` come from the tone so assistive tech announces problems
      // assertively and advisories politely; consumers can override via spread.
      role={toneRole[tone]}
      className={bannerVariants({ variant, tone })}
      {...props}
    >
      {inlineStartNode === undefined ? (
        <DefaultIcon aria-hidden className={bannerIconVariants({ variant, tone })} />
      ) : inlineStartNode ? (
        <span aria-hidden className={bannerIconNodeVariants({ variant, tone })}>
          {inlineStartNode}
        </span>
      ) : null}
      <div className={bannerBodyVariants({ variant, tone })}>
        {title ? <div>{title}</div> : null}
        {children ? <div className={title ? "mt-1" : undefined}>{children}</div> : null}
      </div>
      {actions ? <div className={bannerActionsVariants()}>{actions}</div> : null}
      {onDismiss ? (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          className={bannerDismissVariants()}
        >
          <X aria-hidden className="size-4" />
        </button>
      ) : null}
    </div>
  );
}
