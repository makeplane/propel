import { CircleAlert, Info, Megaphone, TriangleAlert, X, type LucideIcon } from "lucide-react";
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
import { Icon } from "../icon";
import { IconButton } from "../icon-button";

export type { BannerTone, BannerPlacement } from "../../elements/banner";

// The leading icon the system picks per tone when none is supplied. Treated as
// content (overridable via `icon`), not a style placement.
const toneIcon: Record<BannerTone, LucideIcon> = {
  neutral: Info,
  info: Info,
  accent: Megaphone,
  warning: TriangleAlert,
  danger: CircleAlert,
};

export type BannerProps = Omit<BannerElementProps, "children"> & {
  /**
   * Node rendered before the message (inline-start). Defaults to a tone-appropriate lucide icon;
   * pass `null` to hide it. Sized to the banner's node size. Decorative, kept out of the name.
   */
  icon?: React.ReactNode;
  /** The banner's headline. Rendered as its own block above any description body. */
  title?: React.ReactNode;
  /** Body text rendered under the title. */
  description?: React.ReactNode;
  /**
   * Trailing CTA buttons, placed after the message. Per Figma the banner carries up to three CTAs
   * (primary / secondary / tertiary). The dismiss control is a separate slot — pass `onDismiss`
   * rather than appending a dismiss button here.
   */
  actions?: React.ReactNode;
  /**
   * When set, renders the dedicated dismiss control — a ghost, icon-only `IconButton` fixed at the
   * banner's trailing edge (after `actions`), matching Figma's always-last "Close" anatomy node.
   * Consumers own visibility: the handler fires on click; the banner does not hide itself.
   */
  onDismiss?: () => void;
};

/**
 * The ready-made banner: composes the atomic banner parts — the tone icon, the message body
 * (`title` + `description`), trailing `actions`, and an optional trailing `onDismiss` control — so
 * consumers pass content, not layout. Drop down to `@makeplane/propel/elements/banner` to assemble
 * the parts directly.
 */
export function Banner({
  placement,
  tone,
  icon,
  title,
  description,
  actions,
  onDismiss,
  ...props
}: BannerProps) {
  const DefaultIcon = toneIcon[tone];
  return (
    <BannerElement placement={placement} tone={tone} {...props}>
      {icon === undefined ? (
        <BannerIcon placement={placement} tone={tone}>
          <DefaultIcon />
        </BannerIcon>
      ) : icon ? (
        <BannerIcon placement={placement} tone={tone}>
          {icon}
        </BannerIcon>
      ) : null}
      <BannerBody placement={placement} tone={tone}>
        {title ? <BannerTitle placement={placement}>{title}</BannerTitle> : null}
        {description ? <BannerDescription>{description}</BannerDescription> : null}
      </BannerBody>
      {actions || onDismiss ? (
        <BannerActions>
          {actions}
          {onDismiss ? (
            <IconButton
              prominence="ghost"
              tone="neutral"
              magnitude="sm"
              aria-label="Dismiss"
              onClick={onDismiss}
              icon={<Icon icon={X} />}
            />
          ) : null}
        </BannerActions>
      ) : null}
    </BannerElement>
  );
}
