import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menuSearchIconVariants } from "./variants";

export type MenuSearchIconProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The leading icon slot inside `MenuSearch`. Sizes its single child; decorative, so it is
 * `aria-hidden`. Renders and sizes its single child; pass the glyph as `children`.
 */
export function MenuSearchIcon({ render, ...props }: MenuSearchIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: menuSearchIconVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
