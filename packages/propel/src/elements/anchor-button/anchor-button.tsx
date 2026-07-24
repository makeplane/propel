import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type AnchorButtonVariantProps, anchorButtonVariants } from "./variants";

export type { AnchorButtonSize, AnchorButtonVariant } from "./variants";

export type AnchorButtonProps = Omit<useRender.ComponentProps<"button">, "className" | "style"> &
  AnchorButtonVariantProps;

/**
 * The styled `<button>` that reads as an inline text link — the "action that looks like a link" (a
 * "Show more" toggle, an inline "Edit"). Base-UI-agnostic: pick the link palette (`variant`) and
 * text size (`size`); the action behavior grafts in `components` via `<BaseButton
 * render={<AnchorButton/>} />`. Default element is `<button>`; for real navigation pass
 * `nativeButton={false}` + `render={<a href=… />}` on the ready-made. For a nav link wearing
 * _button_ chrome, use `Button` with the same `render` mechanics — not this component.
 */
export function AnchorButton({ variant, size, render, ...props }: AnchorButtonProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    className: anchorButtonVariants({ variant, size }),
  };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
