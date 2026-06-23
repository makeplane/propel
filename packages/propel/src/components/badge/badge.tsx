import { X } from "lucide-react";
import type * as React from "react";

import {
  Badge as BadgeRoot,
  type BadgeProps as BadgeRootProps,
  BadgeDismiss,
  BadgeIcon,
  BadgeLabel,
} from "../../ui/badge";

export type BadgeProps = BadgeRootProps & {
  /** The badge label — text, a count, or any inline content. */
  children?: React.ReactNode;
  /**
   * Node rendered before the label (inline-start). An icon or any node; sized to the badge's
   * `--node-size` and tinted to the tone. Decorative, kept out of the name.
   */
  inlineStartNode?: React.ReactNode;
  /**
   * When provided, shows a trailing dismiss/remove button that calls this on click. Pair with
   * `dismissLabel` for the button's accessible name.
   */
  onDismiss?: () => void;
  /** Accessible name for the dismiss button (defaults to "Remove"). */
  dismissLabel?: string;
};

/**
 * The ready-made badge: composes the atomic `Badge` pill with an optional leading `BadgeIcon`, the
 * `BadgeLabel`, and an optional trailing `BadgeDismiss` action.
 */
export function Badge({
  children,
  inlineStartNode,
  onDismiss,
  dismissLabel = "Remove",
  ...props
}: BadgeProps) {
  return (
    <BadgeRoot {...props}>
      {inlineStartNode ? <BadgeIcon>{inlineStartNode}</BadgeIcon> : null}
      <BadgeLabel>{children}</BadgeLabel>
      {onDismiss ? (
        <BadgeDismiss aria-label={dismissLabel} onClick={onDismiss}>
          <X />
        </BadgeDismiss>
      ) : null}
    </BadgeRoot>
  );
}
