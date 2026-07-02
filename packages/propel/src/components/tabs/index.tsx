export * from "./tab";
export * from "./tabs";
export * from "./tabs-indicator";
export * from "./tabs-list";
export * from "./tabs-panel";
// Re-export the styled parts with no behavior of their own so a full tab set is importable from this
// convenience: the horizontal scroll frame the ready-made `TabsList` composes, and the set's
// `appearance` axis type.
export {
  TabsListScrollArea,
  type TabsListScrollAreaProps,
  type TabsAppearance,
} from "../../elements/tabs";
