import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type ButtonVariantProps, buttonVariants } from "./variants";

export type { ButtonFillType, ButtonSize, ButtonVariant } from "./variants";

export type ButtonProps = Omit<useRender.ComponentProps<"button">, "className" | "style"> &
  ButtonVariantProps;

/**
 * The styled action button element: a `<button>` built on propel's design tokens. Pick its look
 * with `variant` (Figma Type primary·secondary·tertiary·ghost plus the `danger`/`danger-outline`
 * error palettes), the size with `size`, and full-width with `fillType` — all required, so
 * consumers choose explicitly. Base-UI-agnostic — graft Base UI's `Button` behavior in `components`
 * via `<BaseButton render={<Button/>} />`. For a navigation link wearing this chrome, render it as
 * an `<a>` (`nativeButton={false}` + `render={<a href=… />}` on the ready-made). `children` is
 * passed through; it is not a variant.
 */
export function Button({ variant, size, fillType, render, ...props }: ButtonProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    className: buttonVariants({ variant, size, fillType }),
  };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
