import { CircleAlert, Info, Megaphone, TriangleAlert, type LucideIcon } from "lucide-react";
import type * as React from "react";

import {
  Banner as BannerElement,
  BannerActions,
  BannerBody,
  BannerDescription,
  BannerIcon,
  type BannerProps as BannerElementProps,
  type BannerTone,
  BannerTitle,
} from "../../elements/banner";

export type { BannerTone, BannerPlacement } from "../../elements/banner";

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
  /**
   * Trailing actions, placed after the message — e.g. buttons, or a dismiss `IconButton`
   * (`<IconButton aria-label="Dismiss" onClick={…}><X /></IconButton>`).
   */
  actions?: React.ReactNode;
};

/**
 * The ready-made banner: composes the atomic banner parts — the tone icon, the message body
 * (`title` + `children`), and trailing `actions` — so consumers pass content, not layout. A dismiss
 * is just an action: render an `IconButton` in `actions`. Drop down to
 * `@plane/propel/elements/banner` to assemble the parts directly.
 */
export function Banner({
  placement,
  tone,
  inlineStartNode,
  title,
  actions,
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
    </BannerElement>
  );
}
