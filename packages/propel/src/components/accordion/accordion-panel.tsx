import {
  AccordionPanel as AccordionPanelElement,
  AccordionPanelContent,
  type AccordionPanelProps as AccordionPanelElementProps,
} from "../../ui/accordion";

export type AccordionPanelProps = AccordionPanelElementProps;

/**
 * The ready-made accordion panel: composes the atomic `AccordionPanel` with the
 * `AccordionPanelContent` padding wrapper so content is inset from the trigger's edges.
 */
export function AccordionPanel({ children, ...props }: AccordionPanelProps) {
  return (
    <AccordionPanelElement {...props}>
      <AccordionPanelContent>{children}</AccordionPanelContent>
    </AccordionPanelElement>
  );
}
