import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { accordionPanelVariants } from "./variants";

export type AccordionPanelProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The collapsible content region for an item. Animates open/closed using Base UI's
 * `--accordion-panel-height`. Base-UI-agnostic — graft in `components` via `<BaseAccordion.Panel
 * render={<AccordionPanel/>} />`.
 */
export function AccordionPanel({ render, ...props }: AccordionPanelProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: accordionPanelVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
