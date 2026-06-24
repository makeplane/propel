export { Tab, type TabProps } from "./tab";
export { Tabs, type TabsProps } from "./tabs";
export { TabsList, type TabsListProps } from "./tabs-list";
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
