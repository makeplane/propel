import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { dialogBodyVariants } from "./variants";

export type DialogBodyProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The scrollable main content region of the dialog popup. Grows to fill available space and scrolls
 * vertically when content exceeds the popup's max-height. Side padding is baked in. Pass any
 * content — plain text, form fields, lists — as children.
 */
export function DialogBody({ render, ...props }: DialogBodyProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: dialogBodyVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
