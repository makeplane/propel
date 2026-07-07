import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { previewCardIconVariants } from "./variants";

export type PreviewCardIconProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The decorative leading glyph shown beside the title (a favicon stand-in, an entity-type icon, …).
 * Sizes its single child to `--node-size`, so the caller passes a bare icon. Decorative — the title
 * carries the accessible name — so it is `aria-hidden`.
 */
export function PreviewCardIcon({ render, ...props }: PreviewCardIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: previewCardIconVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
