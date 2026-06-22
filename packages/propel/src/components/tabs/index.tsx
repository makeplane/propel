export { Tab, type TabProps } from "./tab";
export { TabsList, type TabsListProps } from "./tabs-list";
// Re-export the atomic structural parts so a full tab set is importable from this convenience.
export {
  Tabs,
  TabsIndicator,
  type TabsIndicatorProps,
  TabsPanel,
  type TabsPanelProps,
  type TabsProps,
  type TabsVariant,
} from "../../ui/tabs";
