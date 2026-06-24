import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type AnchorVariantProps, anchorVariants } from "./variants";

export type { AnchorEmphasis, AnchorMagnitude, AnchorVariantProps } from "./variants";

export type AnchorProps = Omit<useRender.ComponentProps<"a">, "className" | "style"> &
  AnchorVariantProps;

/**
 * An inline text link (`<a>`) in propel's link palette — the correct element for the look that used
 * to be `Button variant="link"`. Pick `emphasis` (`solid` blue / `subtle` gray) and `magnitude`,
 * both required. Renders an `<a>` and is render-capable for the rare action-as-link
 * (`render={<button />}`). `children` is passed through.
 */
export function Anchor({ emphasis, magnitude, render, ...props }: AnchorProps) {
  const defaultProps: useRender.ElementProps<"a"> = {
    className: anchorVariants({ emphasis, magnitude }),
  };
  return useRender({ defaultTagName: "a", render, props: mergeProps(defaultProps, props) });
}
