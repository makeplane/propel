import type * as React from "react";

import {
  Badge as BadgeElement,
  type BadgeProps as BadgeElementProps,
  BadgeIcon,
  BadgeLabel,
} from "../../elements/badge";

export type BadgeProps = BadgeElementProps & {
  /** The badge label — text, a count, or any inline content. */
  children?: React.ReactNode;
  /**
   * Node rendered before the label (inline-start). A bare icon or any node; sized to the badge's
   * `--node-size` and tinted to the tone. Decorative, kept out of the name.
   */
  startIcon?: React.ReactNode;
  /**
   * Node rendered after the label (inline-end). A bare icon or any node; sized to the badge's
   * `--node-size` and tinted to the tone. Decorative, kept out of the name.
   */
  endIcon?: React.ReactNode;
};

/**
 * The ready-made badge: composes the atomic `Badge` pill with the `BadgeLabel` and optional leading
 * (`startIcon`) and trailing (`endIcon`) icon slots.
 */
export function Badge({ children, startIcon, endIcon, ...props }: BadgeProps) {
  return (
    <BadgeElement {...props}>
      {startIcon ? <BadgeIcon>{startIcon}</BadgeIcon> : null}
      <BadgeLabel>{children}</BadgeLabel>
      {endIcon ? <BadgeIcon>{endIcon}</BadgeIcon> : null}
    </BadgeElement>
  );
}
