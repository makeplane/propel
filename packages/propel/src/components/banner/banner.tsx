import { CircleAlert, Info, Megaphone, TriangleAlert, X, type LucideIcon } from "lucide-react";
import type * as React from "react";

import {
  Banner as BannerElement,
  BannerActions,
  BannerBody,
  BannerDescription,
  BannerDismiss,
  BannerIcon,
  type BannerProps as BannerElementProps,
  type BannerTone,
  BannerTitle,
} from "../../ui/banner";

export type { BannerTone, BannerPlacement } from "../../ui/banner";

// The leading icon the system picks per tone when none is supplied. Treated as
// content (overridable via `inlineStartNode`), not a style placement.
const toneIcon: Record<BannerTone, LucideIcon> = {
  neutral: Info,
  info: Info,
  accent: Megaphone,
  warning: TriangleAlert,
  danger: CircleAlert,
};

export type BannerProps = BannerElementProps & {
  /**
   * Node rendered before the message (inline-start). Defaults to a tone-appropriate lucide icon;
   * pass `null` to hide it. Sized to the banner's node size. Decorative, kept out of the name.
   */
  inlineStartNode?: React.ReactNode;
  /** The banner's headline. Rendered as its own block above any `children` body. */
  title?: React.ReactNode;
  /** Trailing actions (e.g. buttons), placed after the message. */
  actions?: React.ReactNode;
} & (
    | { onDismiss?: undefined; dismissLabel?: undefined }
    | {
        /**
         * When provided, shows a dismiss button that calls this on click. Pair with `dismissLabel`
         * for the button's accessible name.
         */
        onDismiss: () => void;
        /**
         * Accessible name for the dismiss button. Required whenever `onDismiss` is set — there is
         * no baked default so consumers localize it.
         */
        dismissLabel: string;
      }
  );

/**
 * The ready-made banner: composes the atomic banner parts — the tone icon, the message body
 * (`title` + `children`), trailing `actions`, and an optional dismiss button — so consumers pass
 * content, not layout. Drop down to `@plane/propel/ui/banner` to assemble the parts directly.
 */
export function Banner({
  placement,
  tone,
  inlineStartNode,
  title,
  actions,
  onDismiss,
  dismissLabel,
  children,
  ...props
}: BannerProps) {
  const DefaultIcon = toneIcon[tone];
  return (
    <BannerElement placement={placement} tone={tone} {...props}>
      {inlineStartNode === undefined ? (
        <BannerIcon placement={placement} tone={tone}>
          <DefaultIcon />
        </BannerIcon>
      ) : inlineStartNode ? (
        <BannerIcon placement={placement} tone={tone}>
          {inlineStartNode}
        </BannerIcon>
      ) : null}
      <BannerBody placement={placement} tone={tone}>
        {title ? <BannerTitle>{title}</BannerTitle> : null}
        {children ? <BannerDescription>{children}</BannerDescription> : null}
      </BannerBody>
      {actions ? <BannerActions>{actions}</BannerActions> : null}
      {onDismiss && dismissLabel ? (
        <BannerDismiss aria-label={dismissLabel} onClick={onDismiss}>
          <X aria-hidden />
        </BannerDismiss>
      ) : null}
    </BannerElement>
  );
}
