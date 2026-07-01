import type * as React from "react";

import {
  Badge as BadgeElement,
  type BadgeProps as BadgeElementProps,
  BadgeIcon,
  BadgeLabel,
} from "../../ui/badge";

export type BadgeProps = BadgeElementProps & {
  /** The badge label — text, a count, or any inline content. */
  children?: React.ReactNode;
  /**
   * Node rendered before the label (inline-start). A bare icon or any node; sized to the badge's
   * `--node-size` and tinted to the tone. Decorative, kept out of the name.
   */
  inlineStartNode?: React.ReactNode;
  /**
   * Node rendered after the label (inline-end). A bare icon or any node; sized to the badge's
   * `--node-size` and tinted to the tone. Decorative, kept out of the name.
   */
  inlineEndNode?: React.ReactNode;
};

/**
 * The ready-made badge: composes the atomic `Badge` pill with the `BadgeLabel` and optional leading
 * (`inlineStartNode`) and trailing (`inlineEndNode`) icon slots.
 */
export function Badge({ children, inlineStartNode, inlineEndNode, ...props }: BadgeProps) {
  return (
    <BadgeElement {...props}>
      {inlineStartNode ? <BadgeIcon>{inlineStartNode}</BadgeIcon> : null}
      <BadgeLabel>{children}</BadgeLabel>
      {inlineEndNode ? <BadgeIcon>{inlineEndNode}</BadgeIcon> : null}
    </BadgeElement>
  );
}
