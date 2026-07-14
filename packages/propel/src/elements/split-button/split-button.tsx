import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type SplitButtonVariantProps, splitButtonVariants } from "./variants";

export type { SplitButtonMagnitude, SplitButtonProminence, SplitButtonTone } from "./variants";

export type SplitButtonProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  SplitButtonVariantProps;

/**
 * The styled connected frame around a split button's two segments — the main action button and the
 * menu-opening icon button. It flattens the segments' shared edge and draws the divider between
 * them; the segments keep their own control chrome. Base-UI-agnostic (there is no Base UI
 * split-button primitive); the `components` ready-made composes `Button` + `MenuTrigger`-grafted
 * `IconButton` inside it.
 */
export function SplitButton({ prominence, tone, magnitude, render, ...props }: SplitButtonProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: splitButtonVariants({ prominence, tone, magnitude }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
