import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { accordionVariants } from "./variants";

export type AccordionProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled accordion frame that groups a set of `AccordionItem`s. Base-UI-agnostic — graft the
 * accordion behavior in `components` via `<BaseAccordion.Root render={<Accordion/>} />`.
 */
export function Accordion({ render, ...props }: AccordionProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: accordionVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
