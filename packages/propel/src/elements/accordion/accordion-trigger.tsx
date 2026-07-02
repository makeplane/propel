import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { accordionTriggerVariants } from "./variants";

export type AccordionTriggerProps = Omit<useRender.ComponentProps<"button">, "className" | "style">;

/**
 * The clickable control that opens and closes its panel. Base-UI-agnostic — graft in `components`
 * via `<BaseAccordion.Trigger render={<AccordionTrigger/>} />`, which wires `aria-expanded` and
 * `aria-controls`.
 */
export function AccordionTrigger({ render, ...props }: AccordionTriggerProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    className: accordionTriggerVariants(),
  };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
