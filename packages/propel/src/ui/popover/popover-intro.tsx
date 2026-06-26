import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { popoverIntroVariants } from "./variants";

/** Props for {@link PopoverIntro}. */
export type PopoverIntroProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The popup's leading text group — a `PopoverTitle` stacked over a `PopoverDescription`, spaced by
 * a tight gap. Sits as a child of `PopoverBody`.
 */
export function PopoverIntro({ render, ...props }: PopoverIntroProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: popoverIntroVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
