import type * as React from "react";

import {
  Badge as BadgeElement,
  type BadgeProps as BadgeElementProps,
  BadgeLabel,
} from "../../elements/badge";

type BadgeOwnProps = Omit<BadgeElementProps, "children" | "aria-label"> & {
  /** Element rendered before the label (inline-start), e.g. `<Icon icon={Check} />`. */
  startIcon?: React.ReactNode;
  /** Element rendered after the label (inline-end), e.g. `<Icon icon={Sparkles} />`. */
  endIcon?: React.ReactNode;
};

/**
 * Either a text badge or an icon-only one — and the accessible name is required either way. A
 * labeled badge is named by its visible text (`aria-label` optional); an icon-only badge (no
 * `label`) renders a `role="img"` pill whose name MUST come from `aria-label`, so the union makes
 * omitting both a type error rather than a silently unnamed badge.
 */
export type BadgeProps = BadgeOwnProps &
  ({ label: string; "aria-label"?: string } | { label?: undefined; "aria-label": string });

/**
 * The ready-made badge: composes the atomic `Badge` pill with the `BadgeLabel` and optional leading
 * (`startIcon`) and trailing (`endIcon`) icon slots. With no `label` the pill is icon-only — the
 * label part is skipped entirely (an empty flex child would still consume the pill's `gap` and
 * render it lopsided), and the pill defaults to `role="img"` so an author-supplied `aria-label` is
 * valid ARIA (a bare `<span>`'s `generic` role doesn't support naming).
 */
export function Badge({ label, startIcon, endIcon, ...props }: BadgeProps) {
  return (
    <BadgeElement role={label == null ? "img" : undefined} {...props}>
      {startIcon}
      {label != null ? <BadgeLabel>{label}</BadgeLabel> : null}
      {endIcon}
    </BadgeElement>
  );
}
