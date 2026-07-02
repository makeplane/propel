export * from "./menubar";
// Re-export propel's STYLED menubar trigger parts so a full menu bar can be assembled from one
// entry. The `Menubar` container's behavior is grafted by the ready-made above; the trigger parts
// carry no behavior of their own — a composition grafts `Menu.Trigger` onto `MenubarTrigger`.
export {
  MenubarTrigger,
  type MenubarTriggerProps,
  MenubarTriggerIcon,
  type MenubarTriggerIconProps,
  MenubarTriggerLabel,
  type MenubarTriggerLabelProps,
} from "../../elements/menubar";
