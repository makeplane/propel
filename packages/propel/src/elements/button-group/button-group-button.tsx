import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type ButtonGroupButtonVariantProps, buttonGroupButtonVariants } from "./variants";

export type { ButtonGroupButtonSize } from "./variants";

export type ButtonGroupButtonProps = Omit<
  useRender.ComponentProps<"button">,
  "className" | "style"
> &
  ButtonGroupButtonVariantProps;

/**
 * The styled segment of a `ButtonGroup`: a transparent, borderless `<button>` whose group chrome
 * (surface, border, dividers, radius) is owned by the surrounding `ButtonGroup` container. Its only
 * visual axis is `size`; the Base UI `Button` behavior grafts onto it in `components` via
 * `<BaseButton render={<ButtonGroupButton/>} />`. `children` is passed through; it is not a
 * variant.
 */
export function ButtonGroupButton({ size, render, ...props }: ButtonGroupButtonProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    className: buttonGroupButtonVariants({ size }),
  };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
