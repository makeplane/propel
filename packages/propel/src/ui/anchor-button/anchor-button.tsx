import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type AnchorButtonVariantProps, anchorButtonVariants } from "./variants";

export type {
  AnchorButtonMagnitude,
  AnchorButtonProminence,
  AnchorButtonSizing,
  AnchorButtonTone,
} from "./variants";

export type AnchorButtonProps = Omit<useRender.ComponentProps<"a">, "className" | "style"> &
  AnchorButtonVariantProps;

/**
 * A link that looks like a button (`<a>` wearing the shared control chrome) — for navigation that
 * should read as a button. Same surface as `Button` (`prominence`/`tone`/`magnitude`/`sizing`, all
 * required) but it renders an `<a>` and takes `href`. Compose a
 * `AnchorButtonIcon`/`AnchorButtonLabel` inside.
 */
export function AnchorButton({
  prominence,
  tone,
  magnitude,
  sizing,
  render,
  ...props
}: AnchorButtonProps) {
  const defaultProps: useRender.ElementProps<"a"> = {
    className: anchorButtonVariants({ prominence, tone, magnitude, sizing }),
  };
  return useRender({ defaultTagName: "a", render, props: mergeProps(defaultProps, props) });
}
