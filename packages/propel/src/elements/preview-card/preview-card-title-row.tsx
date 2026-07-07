import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { previewCardTitleRowVariants } from "./variants";

export type PreviewCardTitleRowProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * Lays an optional `PreviewCardIcon` beside `PreviewCardTitle`. Compose it only when the card has a
 * leading icon; a card without one renders `PreviewCardTitle` directly inside `PreviewCardBody`.
 */
export function PreviewCardTitleRow({ render, ...props }: PreviewCardTitleRowProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: previewCardTitleRowVariants(),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
