import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { buttonIconVariants } from "./variants";

export type ButtonIconProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * A decorative node beside the label (Figma leading/trailing icon). Sizes its single child to the
 * button's `--node-size`, so callers pass a bare icon/avatar. Decorative — the button's label
 * carries the accessible name — so it is `aria-hidden`.
 */
export function ButtonIcon({ render, ...props }: ButtonIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: buttonIconVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
