import type * as React from "react";

import {
  Badge as BadgeElement,
  type BadgeProps as BadgeElementProps,
  BadgeLabel,
} from "../../elements/badge";

export type BadgeProps = Omit<BadgeElementProps, "children"> & {
  /** The badge label text. Omit for an icon-only badge (a compact status indicator). */
  label?: string;
  /** Element rendered before the label (inline-start), e.g. `<Icon icon={Check} />`. */
  startIcon?: React.ReactNode;
  /** Element rendered after the label (inline-end), e.g. `<Icon icon={Sparkles} />`. */
  endIcon?: React.ReactNode;
};

/**
 * The ready-made badge: composes the atomic `Badge` pill with the `BadgeLabel` and optional leading
 * (`startIcon`) and trailing (`endIcon`) icon slots. With no `label` the pill is icon-only — the
 * label part is skipped entirely (an empty flex child would still consume the pill's `gap` and
 * render it lopsided).
 */
export function Badge({ label, startIcon, endIcon, ...props }: BadgeProps) {
  return (
    <BadgeElement {...props}>
      {startIcon}
      {label != null ? <BadgeLabel>{label}</BadgeLabel> : null}
      {endIcon}
    </BadgeElement>
  );
}
