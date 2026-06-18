import {
  AccordionPanel as AccordionPanelRoot,
  type AccordionPanelProps as AccordionPanelRootProps,
} from "../../ui/accordion";

export type AccordionPanelProps = AccordionPanelRootProps;

/**
 * The ready-made accordion panel: composes the atomic `AccordionPanel` and adds the inner padding
 * wrapper so content is inset from the trigger's edges.
 */
export function AccordionPanel({ children, ...props }: AccordionPanelProps) {
  return (
    <AccordionPanelRoot {...props}>
      <div className="px-3 pb-3">{children}</div>
    </AccordionPanelRoot>
  );
}
