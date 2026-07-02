import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type ButtonAnchorVariantProps, buttonAnchorVariants } from "./variants";

export type { ButtonAnchorMagnitude, ButtonAnchorProminence } from "./variants";

export type ButtonAnchorProps = Omit<useRender.ComponentProps<"button">, "className" | "style"> &
  ButtonAnchorVariantProps;

/**
 * The styled `<button>` that reads as an inline text link — the "action that looks like a link" (a
 * "Show more" toggle, an inline "Edit"). Base-UI-agnostic: pick the link palette (`prominence`,
 * shared with `Anchor`) and text size (`magnitude`); the action behavior grafts in `components` via
 * `<BaseButton render={<ButtonAnchor/>} />`. For a nav `<a>` styled as a button use `AnchorButton`;
 * for a real inline link, `Anchor`.
 */
export function ButtonAnchor({ prominence, magnitude, render, ...props }: ButtonAnchorProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    className: buttonAnchorVariants({ prominence, magnitude }),
  };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
