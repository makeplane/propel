import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { iconButtonVariants, type IconButtonVariantProps } from "./variants";

export type IconButtonProps = Omit<useRender.ComponentProps<"button">, "className" | "style"> &
  IconButtonVariantProps;

/**
 * The square button box of the icon-only button: a styled `<button>` with no baked content. It owns
 * its chrome (`prominence`/`tone`) and geometry (`magnitude`'s square `size-N` box and
 * `--node-size` glyph scale) through `iconButtonVariants`. Base-UI-agnostic — graft the `Button`
 * behavior in `components` via `<BaseButton render={<IconButton/>} />`. There is no separate
 * link-variant family; the ready-made can still render as `<a>` via `render` +
 * `nativeButton={false}`. Compose an icon or spinner slot inside it.
 */
export function IconButton({ prominence, tone, magnitude, render, ...props }: IconButtonProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    className: iconButtonVariants({ prominence, tone, magnitude }),
  };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
