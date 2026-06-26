import { Button as BaseButton } from "@base-ui/react/button";

import { type ButtonAnchorVariantProps, buttonAnchorVariants } from "./variants";

export type { ButtonAnchorMagnitude, ButtonAnchorProminence } from "./variants";

export type ButtonAnchorProps = Omit<BaseButton.Props, "className" | "style"> &
  ButtonAnchorVariantProps;

/**
 * A `<button>` (an action) that _looks like_ an inline text link — the "action that reads as a
 * link" (e.g. a "Show more" toggle, an inline "Edit"). Button behavior (`onClick`, `disabled`,
 * `type`); the link palette (`prominence`) and text size (`magnitude`) are shared with `Anchor`.
 * For a navigation link that looks like a button, use `AnchorButton`; for a real inline link, use
 * `Anchor`.
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
      className={buttonAnchorVariants({ prominence, magnitude })}
      {...props}
    />
  );
}
