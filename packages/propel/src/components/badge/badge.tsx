import { X } from "lucide-react";
import type * as React from "react";

import {
  Badge as BadgeElement,
  type BadgeProps as BadgeElementProps,
  BadgeDismiss,
  BadgeIcon,
  BadgeLabel,
} from "../../ui/badge";

export type BadgeProps = BadgeElementProps & {
  /** The badge label — text, a count, or any inline content. */
  children?: React.ReactNode;
  /**
   * Node rendered before the label (inline-start). An icon or any node; sized to the badge's
   * `--node-size` and tinted to the tone. Decorative, kept out of the name.
   */
  inlineStartNode?: React.ReactNode;
} & (
    | { onDismiss?: undefined; dismissLabel?: undefined }
    | {
        /** When set, shows a trailing dismiss button that calls this on click. */
        onDismiss: () => void;
        /** Accessible name for the dismiss button — required so it can be localized. */
        dismissLabel: string;
      }
  );

/**
 * The ready-made badge: composes the atomic `Badge` pill with an optional leading `BadgeIcon`, the
 * `BadgeLabel`, and an optional trailing `BadgeDismiss` action. Pass `onDismiss` to show the
 * dismiss button; its accessible name (`dismissLabel`) is then required, so consumers localize it.
 */
export function Badge({
  children,
  inlineStartNode,
  onDismiss,
  dismissLabel,
  ...props
}: BadgeProps) {
  return (
    <BadgeElement {...props}>
      {inlineStartNode ? <BadgeIcon>{inlineStartNode}</BadgeIcon> : null}
      <BadgeLabel>{children}</BadgeLabel>
      {onDismiss && dismissLabel ? (
        <BadgeDismiss aria-label={dismissLabel} onClick={onDismiss}>
          <X />
        </BadgeDismiss>
      ) : null}
    </BadgeElement>
  );
}
