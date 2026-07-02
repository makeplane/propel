import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { dialogHeaderVariants } from "./variants";

export type DialogHeaderProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The top region of the dialog popup. Lays out a `DialogHeading` (title + optional description) at
 * the inline-start and an optional close `IconButton` at the inline-end. Padding is baked in; the
 * spacing to the body/actions is provided by the parent `DialogPopup` via its `gap`.
 */
export function DialogHeader({ render, ...props }: DialogHeaderProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: dialogHeaderVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
