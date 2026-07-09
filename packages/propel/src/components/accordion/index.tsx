export * from "./accordion";
export * from "./accordion-header";
export * from "./accordion-item";
export * from "./accordion-panel";
export * from "./accordion-trigger";
// Re-export the pure styling slots (no Base UI behavior) so a full accordion is composable from
// this convenience entry; they compose inside the ready-made trigger/panel above.
export {
  AccordionPanelContent,
  type AccordionPanelContentProps,
  AccordionTriggerTitle,
  type AccordionTriggerTitleProps,
} from "../../elements/accordion";
