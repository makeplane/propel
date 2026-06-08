import { cva, cx, type VariantProps } from "class-variance-authority";
import { CircleAlert, Info, Megaphone, TriangleAlert, X, type LucideIcon } from "lucide-react";
import * as React from "react";

// Banner = the Figma "Banners" component. Two scopes (`variant`) and five intents
// (`tone`). `page` is a full-width strip with a bottom border that sits at the top
// of a page; `inline` is a self-contained rounded card placed within content.
const bannerVariants = cva("flex items-center overflow-clip", {
  variants: {
    // Figma "Scope": page banner (full-width strip) vs inline banner (rounded card).
    variant: {
      page: "gap-2 border-b px-4 py-3",
      inline: "gap-2 rounded-lg border px-3 py-2",
    },
    // Figma "Intent": the meaning/color of the banner. Each tone sets its own soft
    // background, border, and (via the text element / icon) foreground color.
    tone: {
      neutral: "",
      info: "",
      accent: "",
      warning: "",
      danger: "",
    },
  },
  // Per Figma the neutral page banner sits on the page surface, while the colored
  // tones use their soft tone surface; inline neutral uses the layered surface.
  compoundVariants: [
    { variant: "page", tone: "neutral", class: "bg-surface-1 border-subtle" },
    { variant: "inline", tone: "neutral", class: "bg-surface-2 border-subtle" },
    { tone: "info", class: "bg-info-subtle border-info-subtle" },
    { tone: "accent", class: "bg-accent-subtle border-accent-subtle" },
    { tone: "warning", class: "bg-warning-subtle border-warning-subtle" },
    { tone: "danger", class: "bg-danger-subtle border-danger-subtle" },
  ],
  defaultVariants: {
    variant: "page",
    tone: "neutral",
  },
});

type BannerVariant = NonNullable<VariantProps<typeof bannerVariants>["variant"]>;
export type BannerTone = NonNullable<VariantProps<typeof bannerVariants>["tone"]>;

// Foreground (title + default icon) color per tone, mapped from the Figma
// `text/*` and `icon/*` tokens to propel's semantic text utilities.
const toneTextClass: Record<BannerTone, string> = {
  neutral: "text-secondary",
  info: "text-info-primary",
  accent: "text-accent-primary",
  warning: "text-warning-secondary",
  danger: "text-danger-primary",
};

const toneIconClass: Record<BannerTone, string> = {
  neutral: "text-icon-tertiary",
  info: "text-icon-info-primary",
  accent: "text-icon-accent-primary",
  warning: "text-icon-warning-secondary",
  danger: "text-icon-danger-secondary",
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
  variant?: BannerVariant;
  /** Figma Intent: the banner's meaning/color. Defaults to `neutral`. */
  tone?: BannerTone;
  /** Leading icon. Defaults to a tone-appropriate lucide icon; pass `null` to hide it. */
  icon?: React.ReactNode;
  /** The banner's headline. Rendered as its own block above any `children` body. */
  title?: React.ReactNode;
  /** Trailing actions (e.g. buttons), placed after the message. */
  actions?: React.ReactNode;
  /** When provided, shows a dismiss button that calls this on click. */
  onDismiss?: () => void;
};

export function Banner({
  variant = "page",
  tone = "neutral",
  icon,
  title,
  actions,
  onDismiss,
  children,
  ...props
}: BannerProps) {
  // The page banner uses a 20px icon and a medium-weight message; the inline
  // banner uses a 16px icon and a regular-weight message (per Figma typography).
  const iconSize = variant === "page" ? "size-5" : "size-4";
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
      {icon === undefined ? (
        <DefaultIcon aria-hidden className={cx("shrink-0", iconSize, toneIconClass[tone])} />
      ) : icon ? (
        <span aria-hidden className={cx("flex shrink-0 items-center", toneIconClass[tone])}>
          {icon}
        </span>
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
