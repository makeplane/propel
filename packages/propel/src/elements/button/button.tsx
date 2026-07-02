import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type ButtonVariantProps, buttonVariants } from "./variants";

export type { ButtonMagnitude, ButtonProminence, ButtonSizing, ButtonTone } from "./variants";

export type ButtonProps = Omit<useRender.ComponentProps<"button">, "className" | "style"> &
  ButtonVariantProps;

/**
 * The styled action button element: a `<button>` built on propel's design tokens. Pick its weight
 * with `prominence` (Figma Type: primary·secondary·tertiary·ghost), the error palette with `tone`,
 * the size with `magnitude`, and full-width with `sizing` — all required, so consumers choose
 * explicitly. Base-UI-agnostic — graft Base UI's `Button` behavior in `components` via `<BaseButton
 * render={<Button/>} />`. For a navigation link wearing this chrome, render it as an `<a>`
 * (`nativeButton={false}` + `render={<a href=… />}` on the ready-made). `children` is passed
 * through; it is not a variant.
 */
export function Button({ prominence, tone, magnitude, sizing, render, ...props }: ButtonProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    className: buttonVariants({ prominence, tone, magnitude, sizing }),
  };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
