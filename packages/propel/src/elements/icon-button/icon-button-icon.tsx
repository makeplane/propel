import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { iconButtonIconVariants } from "./variants";

export type IconButtonIconProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The icon-button's single glyph. Sizes its one child to the root's inherited `--node-size`, so
 * callers pass a bare icon. Decorative (the root's `aria-label` carries the accessible name), so it
 * is `aria-hidden`. Base-UI-agnostic.
 */
export function IconButtonIcon({ render, ...props }: IconButtonIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: iconButtonIconVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
