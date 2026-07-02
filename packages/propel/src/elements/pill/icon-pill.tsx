import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { iconPillVariants, type IconPillVariantProps } from "./variants";

export type IconPillProps = Omit<useRender.ComponentProps<"button">, "className" | "style"> &
  IconPillVariantProps;

/**
 * The icon-only square pill container: a styled `<button>` with no baked content. Compose a
 * `PillIcon` (or `PillSpinner`) inside it. Base-UI-agnostic — graft the Base UI `Button` behavior
 * in `components` via `<BaseButton render={<IconPill/>} />` (which also supplies the required
 * `aria-label`).
 */
export function IconPill({ magnitude, render, ...props }: IconPillProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    className: iconPillVariants({ magnitude }),
    type: "button",
  };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
