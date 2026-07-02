import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { accordionItemVariants } from "./variants";

export type AccordionItemProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * A single collapsible section: pairs an `AccordionHeader` and `AccordionPanel`. Base-UI-agnostic —
 * graft in `components` via `<BaseAccordion.Item render={<AccordionItem/>} value={…} />`.
 */
export function AccordionItem({ render, ...props }: AccordionItemProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: accordionItemVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
