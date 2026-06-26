export * from "./collapsible";
// Re-export the atomic structural parts so a custom collapsible is importable from this convenience.
export {
  CollapsiblePanel,
  type CollapsiblePanelProps,
  CollapsiblePanelContent,
  type CollapsiblePanelContentProps,
  CollapsibleTrigger,
  type CollapsibleTriggerProps,
  CollapsibleTriggerIndicator,
  type CollapsibleTriggerIndicatorProps,
  CollapsibleTriggerTitle,
  type CollapsibleTriggerTitleProps,
} from "../../ui/collapsible";
