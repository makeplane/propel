import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type SplitButtonVariantProps, splitButtonVariants } from "./variants";

export type { SplitButtonSize, SplitButtonVariant } from "./variants";

export type SplitButtonProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  SplitButtonVariantProps;

/**
 * The styled frame around a split button's two segments — the main action button and the
 * menu-opening icon button. Primary lays the segments out as separate 1px-gapped pills (2px radius
 * on the facing edges); secondary flattens the shared edge and draws a divider so they read as one
 * connected outline. Neutral only — there is no danger/error split button. The segments keep their
 * own control chrome. Base-UI-agnostic (there is no Base UI split-button primitive); the
 * `components` ready-made composes `Button` + `MenuTrigger`-grafted `IconButton` inside it.
 */
export function SplitButton({ variant, size, render, ...props }: SplitButtonProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: splitButtonVariants({ variant, size }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
