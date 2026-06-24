import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type ButtonAnchorVariantProps, buttonAnchorVariants } from "./variants";

export type {
  ButtonAnchorMagnitude,
  ButtonAnchorProminence,
  ButtonAnchorSizing,
  ButtonAnchorTone,
  ButtonAnchorVariantProps,
} from "./variants";

export type ButtonAnchorProps = Omit<useRender.ComponentProps<"a">, "className" | "style"> &
  ButtonAnchorVariantProps;

/**
 * A link that looks like a button (`<a>` wearing the shared control chrome) — for navigation that
 * should read as a button. Same surface as `Button` (`prominence`/`tone`/`magnitude`/`sizing`, all
 * required) but it renders an `<a>` and takes `href`. Compose a
 * `ButtonAnchorIcon`/`ButtonAnchorLabel` inside.
 */
export function ButtonAnchor({
  prominence,
  tone,
  magnitude,
  sizing,
  render,
  ...props
}: ButtonAnchorProps) {
  const defaultProps: useRender.ElementProps<"a"> = {
    className: buttonAnchorVariants({ prominence, tone, magnitude, sizing }),
  };
  return useRender({ defaultTagName: "a", render, props: mergeProps(defaultProps, props) });
}
