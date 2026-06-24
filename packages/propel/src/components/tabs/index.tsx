export * from "./tab";
export * from "./tabs";
export * from "./tabs-list";
// Re-export the atomic structural parts so a full tab set is importable from this convenience.
export {
  TabsIndicator,
  type TabsIndicatorProps,
  TabsListScrollArea,
  type TabsListScrollAreaProps,
  TabsPanel,
  type TabsPanelProps,
  type TabsVariant,
} from "../../ui/tabs";
