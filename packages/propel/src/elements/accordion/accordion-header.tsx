import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { accordionHeaderVariants } from "./variants";

export type AccordionHeaderProps = Omit<useRender.ComponentProps<"h3">, "className" | "style">;

/**
 * The heading wrapper for an accordion trigger. Base-UI-agnostic — graft in `components` via
 * `<BaseAccordion.Header render={<AccordionHeader/>} />`.
 */
export function AccordionHeader({ render, ...props }: AccordionHeaderProps) {
  const defaultProps: useRender.ElementProps<"h3"> = { className: accordionHeaderVariants() };
  return useRender({ defaultTagName: "h3", render, props: mergeProps(defaultProps, props) });
}
