import {
  AccordionPanel as AccordionPanelRoot,
  AccordionPanelContent,
  type AccordionPanelProps as AccordionPanelRootProps,
} from "../../ui/accordion";

export type AccordionPanelProps = AccordionPanelRootProps;

/**
 * The ready-made accordion panel: composes the atomic `AccordionPanel` with the
 * `AccordionPanelContent` padding wrapper so content is inset from the trigger's edges.
 */
export function AccordionPanel({ children, ...props }: AccordionPanelProps) {
  return (
    <AccordionPanelRoot {...props}>
      <AccordionPanelContent>{children}</AccordionPanelContent>
    </AccordionPanelRoot>
  );
}
