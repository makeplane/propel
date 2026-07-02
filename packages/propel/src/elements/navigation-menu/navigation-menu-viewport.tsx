import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { navigationMenuViewportVariants } from "./variants";

export type NavigationMenuViewportProps = Omit<
  useRender.ComponentProps<"div">,
  "className" | "style"
>;

/**
 * The styled morph container that resizes between items' `Content`, reading Base UI's
 * `--popup-width`/`--popup-height`. Base-UI-agnostic — graft in `components` via
 * `<BaseNavigationMenu.Viewport render={<NavigationMenuViewport />} />`.
 */
export function NavigationMenuViewport({ render, ...props }: NavigationMenuViewportProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: navigationMenuViewportVariants(),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
