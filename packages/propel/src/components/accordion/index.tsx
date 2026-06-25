export * from "./accordion-panel";
export * from "./accordion-trigger";
// Re-export the atomic structural parts so a full accordion is importable from this convenience.
export {
  Accordion,
  AccordionHeader,
  type AccordionHeaderProps,
  AccordionItem,
  type AccordionItemProps,
  AccordionPanelContent,
  type AccordionPanelContentProps,
  type AccordionProps,
  AccordionTriggerIcon,
  type AccordionTriggerIconProps,
  AccordionTriggerIndicator,
  type AccordionTriggerIndicatorProps,
  AccordionTriggerTitle,
  type AccordionTriggerTitleProps,
} from "../../ui/accordion";
