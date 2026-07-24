import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { iconButtonVariants, type IconButtonVariantProps } from "./variants";

export type IconButtonProps = Omit<useRender.ComponentProps<"button">, "className" | "style"> &
  IconButtonVariantProps;

/**
 * The square button box of the icon-only button: a styled `<button>` with no baked content. It owns
 * its chrome (`variant`) and geometry (`size`'s square `size-N` box and `--node-size` glyph scale)
 * through `iconButtonVariants`. Base-UI-agnostic — graft the `Button` behavior in `components` via
 * `<BaseButton render={<IconButton/>} />`. The ready-made can still render as `<a>` via `render` +
 * `nativeButton={false}`. Compose an icon or spinner slot inside it.
 */
export function IconButton({ variant, size, render, ...props }: IconButtonProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    className: iconButtonVariants({ variant, size }),
  };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
