import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type AnchorButtonVariantProps, anchorButtonVariants } from "./variants";

export type { AnchorButtonMagnitude, AnchorButtonProminence } from "./variants";

export type AnchorButtonProps = Omit<useRender.ComponentProps<"button">, "className" | "style"> &
  AnchorButtonVariantProps;

/**
 * The styled `<button>` that reads as an inline text link — the "action that looks like a link" (a
 * "Show more" toggle, an inline "Edit"). Base-UI-agnostic: pick the link palette (`prominence`,
 * shared with `Anchor`) and text size (`magnitude`); the action behavior grafts in `components` via
 * `<BaseButton render={<AnchorButton/>} />`. For a nav `<a>` styled as a button use `AnchorButton`;
 * for a real inline link, `Anchor`.
 */
export function AnchorButton({ prominence, magnitude, render, ...props }: AnchorButtonProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    className: anchorButtonVariants({ prominence, magnitude }),
  };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
