import { Button as BaseButton } from "@base-ui/react/button";

import {
  ButtonAnchor as ButtonAnchorElement,
  type ButtonAnchorMagnitude,
  type ButtonAnchorProminence,
} from "../../elements/button-anchor";

export type { ButtonAnchorMagnitude, ButtonAnchorProminence } from "../../elements/button-anchor";

export type ButtonAnchorProps = Omit<BaseButton.Props, "className" | "style"> & {
  /** The link palette, shared with `Anchor`: `primary` blue / `secondary` muted gray. */
  prominence: ButtonAnchorProminence;
  /** The text size, shared with `Anchor`. */
  magnitude: ButtonAnchorMagnitude;
};

/**
 * A `<button>` (an action) that _looks like_ an inline text link — the "action that reads as a
 * link" (e.g. a "Show more" toggle, an inline "Edit"). Grafts Base UI `Button` behavior (`onClick`,
 * `disabled`, `focusableWhenDisabled`, `type`) onto the styled `ButtonAnchor` element; the link
 * palette (`prominence`) and text size (`magnitude`) are shared with `Anchor`. For a navigation
 * link that looks like a button use `AnchorButton`; for a real inline link, use `Anchor`.
 */
export function ButtonAnchor({
  prominence,
  magnitude,
  type = "button",
  ...props
}: ButtonAnchorProps) {
  return (
    <BaseButton
      type={type}
      {...props}
      render={<ButtonAnchorElement prominence={prominence} magnitude={magnitude} />}
    />
  );
}
