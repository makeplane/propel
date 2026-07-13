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
   * Trailing actions, placed after the message — e.g. buttons, or a dismiss `IconButton`
   * (`<IconButton aria-label="Dismiss" icon={<Icon icon={X} />} onClick={…} />`).
   */
  actions?: React.ReactNode;
};

/**
 * The ready-made banner: composes the atomic banner parts — the tone icon, the message body
 * (`title` + `description`), and trailing `actions` — so consumers pass content, not layout. A
 * dismiss is just an action: render an `IconButton` in `actions`. Drop down to
 * `@makeplane/propel/elements/banner` to assemble the parts directly.
 */
export function Banner({
  placement,
  tone,
  icon,
  title,
  description,
  actions,
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
      {actions ? <BannerActions>{actions}</BannerActions> : null}
    </BannerElement>
  );
}
