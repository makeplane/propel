import { Accordion as BaseAccordion } from "@base-ui/react/accordion";

import {
  AccordionPanel as AccordionPanelElement,
  AccordionPanelContent,
} from "../../elements/accordion";

export type AccordionPanelProps = Omit<BaseAccordion.Panel.Props, "className" | "style">;

/**
 * The ready-made accordion panel: grafts Base UI's panel behavior onto the styled `AccordionPanel`,
 * composing the `AccordionPanelContent` padding wrapper so content is inset from the trigger's
 * edges.
 */
export function AccordionPanel({ children, ...props }: AccordionPanelProps) {
  return (
    <BaseAccordion.Panel {...props} render={<AccordionPanelElement />}>
      <AccordionPanelContent>{children}</AccordionPanelContent>
    </BaseAccordion.Panel>
  );
}
