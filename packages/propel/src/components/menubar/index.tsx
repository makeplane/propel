export * from "./menubar";
export * from "./menubar-trigger";
// Re-export propel's STYLED menubar trigger slot parts so a full menu bar can be assembled from
// one entry. The ready-made `MenubarTrigger` above replaces the same-named elements element (its
// `Menu.Trigger` behavior is already grafted); the slot parts carry no behavior of their own and
// compose as the trigger's children.
export { MenubarTriggerLabel, type MenubarTriggerLabelProps } from "../../elements/menubar";
